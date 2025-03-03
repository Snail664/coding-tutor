import { OpenAI } from "openai";
import { Anthropic } from "@anthropic-ai/sdk";
import { parseJSON } from "@/lib/utils";

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
  apiKey: string;
  model: string;
};

export class LLM {
  private provider: LLMProvider;
  private openaiClient?: OpenAI;
  private anthropicClient?: Anthropic;
  private model: string;

  constructor(config: LLMConfig) {
    this.provider = config.provider;
    this.model = config.model;

    if (config.provider === "openai") {
      this.openaiClient = new OpenAI({ apiKey: config.apiKey });
    } else {
      this.anthropicClient = new Anthropic({ apiKey: config.apiKey });
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
    const parsedContent = parseJSON(content);
    if (!parsedContent) {
      throw new Error("Failed to parse JSON response from LLM");
    }

    return {
      content: parsedContent as T,
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

  async generate<T = unknown>(
    messages: Message[],
    systemPrompt?: string
  ): Promise<LLMResponse<T>> {
    const startTime = performance.now();
    const totalInputContent = messages.map((m) => m.content).join(" ");

    try {
      if (this.provider === "anthropic") {
        if (!this.anthropicClient)
          throw new Error("Anthropic client not initialized");

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
      } else {
        if (!this.openaiClient)
          throw new Error("OpenAI client not initialized");

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
    } catch (error) {
      console.error(`Error in LLM with model ${this.model}:`, error);
      throw error;
    }
  }
}
