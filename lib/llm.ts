import { OpenAI } from "openai";
import { Anthropic } from "@anthropic-ai/sdk";
import { parseJSON } from "@/lib/utils";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type MetricsT = {
  tokens?: number;
  words: number;
};

type LLMResponse<T = any> = {
  content: T;
  inputMetrics: MetricsT;
  outputMetrics: MetricsT;
  timeTaken: number;
};

class LLMService {
  private openaiClient: OpenAI;
  private anthropicClient: Anthropic;

  constructor() {
    this.openaiClient = new OpenAI({
      apiKey: process.env.OPEN_AI_API_KEY,
    });

    this.anthropicClient = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });
  }

  private countWords(text: string): number {
    return text.split(/\s+/).filter((word) => word.trim().length > 0).length;
  }

  private processResponse<T>(
    content: string,
    usage: any,
    totalInputContent: string,
    startTime: number
  ): LLMResponse<T> {
    const parsedContent = parseJSON(content);
    if (!parsedContent) {
      throw new Error("Failed to parse JSON response from LLM");
    }

    return {
      content: parsedContent as T,
      inputMetrics: {
        tokens: usage.input_tokens || usage?.prompt_tokens,
        words: this.countWords(totalInputContent),
      },
      outputMetrics: {
        tokens: usage.output_tokens || usage?.completion_tokens,
        words: this.countWords(content),
      },
      timeTaken: (performance.now() - startTime) / 1000,
    };
  }

  async generate<T = any>(
    messages: Message[],
    model: string = "gpt-4",
    systemPrompt: string
  ): Promise<LLMResponse<T>> {
    const startTime = performance.now();

    try {
      const totalInputContent = messages.map((m) => m.content).join(" ");

      // Handle Anthropic models
      if (model.startsWith("claude")) {
        const response = await this.anthropicClient.messages.create({
          model: model,
          max_tokens: 1024,
          system: [
            {
              type: "text",
              text: systemPrompt,
              cache_control: { type: "ephemeral" },
            },
          ],
          messages: messages,
        });

        console.log("debugging cache: ", response);
        const content =
          response.content[0].type === "text" ? response.content[0].text : "";
        return this.processResponse<T>(
          content,
          response.usage,
          totalInputContent,
          startTime
        );
      }

      // Handle OpenAI models
      const response = await this.openaiClient.chat.completions.create({
        model: model,
        messages: messages,
      });

      const content = response.choices[0].message.content || "";
      return this.processResponse<T>(
        content,
        response.usage,
        totalInputContent,
        startTime
      );
    } catch (error) {
      console.error(`Error in LLMService with model ${model}:`, error);
      throw error;
    }
  }
}

// Export a singleton instance
export const llmService = new LLMService();

// Export the generate function to maintain the same interface
export const llm = (messages: Message[], model: string, systemPrompt: string) =>
  llmService.generate(messages, model, systemPrompt);
