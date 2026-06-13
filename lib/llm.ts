import { OpenAI } from "openai";
import { Anthropic } from "@anthropic-ai/sdk";
import { parseJSON } from "@/lib/utils";

export class LLMError extends Error {
  constructor(
    message: string,
    public type:
      | "JSON_PARSE"
      | "API_ERROR"
      | "RATE_LIMIT"
      | "VALIDATION"
      | "SERVER_OVERLOAD",
    public retryable: boolean = false
  ) {
    super(message);
    this.name = "LLMError";
  }
}

export type Message = {
  role: "user" | "assistant";
  content: string;
};

export type MetricsT = {
  tokens?: number;
  words: number;
};

export type LLMResponse<T = unknown> = {
  content: T;
  inputMetrics: MetricsT;
  outputMetrics: MetricsT;
  timeTaken: number;
};

export type LLMProvider = "openai" | "anthropic";

export type LLMConfig = {
  provider: LLMProvider;
  model: string;
};

// First, let's define some types for API errors
type APIError = {
  response?: {
    status: number;
    data?: unknown;
  };
  message?: string;
  error?: {
    type: string;
    error?: {
      type: string;
      message: string;
    };
  };
};

export class LLM {
  private provider: LLMProvider;
  private openaiClient?: OpenAI;
  private anthropicClient?: Anthropic;
  private model: string;
  private maxRetries: number;
  private fallbackProvider?: LLMProvider;
  private fallbackModel?: string;

  constructor(config: LLMConfig) {
    this.provider = config.provider;
    this.model = config.model;
    this.maxRetries = 2;

    // Initialize both clients with their respective API keys
    this.openaiClient = new OpenAI({
      apiKey: process.env.OPEN_AI_API_KEY || "",
    });
    this.anthropicClient = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY || "",
    });

    // Set up fallback configuration
    if (config.provider === "openai") {
      this.fallbackProvider = "anthropic";
      this.fallbackModel = "claude-sonnet-4-6";
    } else {
      this.fallbackProvider = "openai";
      this.fallbackModel = "gpt-4o-2024-08-06";
    }
  }

  private countWords(text: string): number {
    return text.split(/\s+/).filter((word) => word.trim().length > 0).length;
  }

  private createMetrics(tokens: number | undefined, text: string): MetricsT {
    return {
      tokens,
      words: this.countWords(text),
    };
  }

  private processResponse<T>(
    content: string,
    usage: {
      prompt_tokens?: number;
      completion_tokens?: number;
      input_tokens?: number;
      output_tokens?: number;
    },
    totalInputContent: string,
    startTime: number
  ): LLMResponse<T> {
    let parsedContent: T | null = null;
    let retryCount = 0;

    while (retryCount <= this.maxRetries) {
      try {
        parsedContent = parseJSON(content) as T;
        if (parsedContent) break;
      } catch (error) {
        console.warn(`JSON parsing attempt ${retryCount + 1} failed:`, error);
        if (retryCount === this.maxRetries) {
          throw new LLMError(
            "Failed to parse LLM response",
            "JSON_PARSE",
            false
          );
        }
      }
      retryCount++;
    }

    if (!parsedContent) {
      throw new Error(
        `Failed to parse JSON response from LLM after ${this.maxRetries} retries`
      );
    }

    return {
      content: parsedContent,
      inputMetrics: this.createMetrics(
        usage.prompt_tokens || usage.input_tokens,
        totalInputContent
      ),
      outputMetrics: this.createMetrics(
        usage.completion_tokens || usage.output_tokens,
        content
      ),
      timeTaken: (performance.now() - startTime) / 1000,
    };
  }

  private async callAnthropicAPI<T>(
    messages: Message[],
    totalInputContent: string,
    startTime: number,
    systemPrompt?: string
  ): Promise<LLMResponse<T>> {
    if (!this.anthropicClient) {
      throw new Error("Anthropic client not initialized");
    }

    const response = await this.anthropicClient.messages.create({
      model: this.model,
      max_tokens: 1024,
      ...(systemPrompt
        ? {
            system: [
              {
                type: "text",
                text: systemPrompt,
                cache_control: { type: "ephemeral" },
              },
            ],
          }
        : {}),
      messages,
    });

    const content =
      response.content[0].type === "text" ? response.content[0].text : "";
    return this.processResponse<T>(
      content,
      response.usage,
      totalInputContent,
      startTime
    );
  }

  private async callOpenAIAPI<T>(
    messages: Message[],
    totalInputContent: string,
    startTime: number,
    systemPrompt?: string
  ): Promise<LLMResponse<T>> {
    if (!this.openaiClient) {
      throw new Error("OpenAI client not initialized");
    }

    const response = await this.openaiClient.chat.completions.create({
      model: this.model,
      messages: systemPrompt
        ? [{ role: "system", content: systemPrompt }, ...messages]
        : messages,
    });

    const content = response.choices[0].message.content || "";
    return this.processResponse<T>(
      content,
      response.usage!,
      totalInputContent,
      startTime
    );
  }

  async generate<T = unknown>(
    messages: Message[],
    systemPrompt?: string
  ): Promise<LLMResponse<T>> {
    const startTime = performance.now();
    const totalInputContent = messages.map((m) => m.content).join(" ");

    try {
      // Try primary provider first
      if (this.provider === "anthropic") {
        return await this.callAnthropicAPI<T>(
          messages,
          totalInputContent,
          startTime,
          systemPrompt
        );
      } else {
        return await this.callOpenAIAPI<T>(
          messages,
          totalInputContent,
          startTime,
          systemPrompt
        );
      }
    } catch (error: unknown) {
      console.error(`Error with primary provider (${this.provider}):`, error);

      // Type guard for API errors
      const apiError = error as APIError;

      // Check if it's a server overload error
      const isOverloadError =
        // Anthropic overload error structure
        apiError.error?.error?.type === "overloaded_error" ||
        // OpenAI overload error
        apiError.response?.status === 503;

      if (isOverloadError && this.fallbackProvider) {
        console.log(
          `Primary provider overloaded, trying fallback: ${this.fallbackProvider}`
        );

        try {
          // Store original provider and model
          const originalProvider = this.provider;
          const originalModel = this.model;

          // Switch to fallback provider
          this.provider = this.fallbackProvider;
          this.model = this.fallbackModel!;

          // Try with fallback provider
          const result =
            this.provider === "anthropic"
              ? await this.callAnthropicAPI<T>(
                  messages,
                  totalInputContent,
                  startTime,
                  systemPrompt
                )
              : await this.callOpenAIAPI<T>(
                  messages,
                  totalInputContent,
                  startTime,
                  systemPrompt
                );

          // Restore original provider and model
          this.provider = originalProvider;
          this.model = originalModel;

          return result;
        } catch (fallbackError) {
          console.error(`Fallback provider also failed:`, fallbackError);
          throw new LLMError(
            "Both primary and fallback providers failed",
            "SERVER_OVERLOAD",
            false
          );
        }
      }

      // Handle other types of errors
      if (error instanceof LLMError) {
        throw error;
      }

      // Handle rate limits
      if (apiError.response?.status === 429) {
        throw new LLMError("Rate limit exceeded", "RATE_LIMIT", true);
      }

      throw new LLMError(
        apiError.message || "Unknown error occurred",
        "API_ERROR",
        true
      );
    }
  }
}
