import { OpenAI } from "openai";
import { Anthropic } from "@anthropic-ai/sdk";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type MetricsT = {
  tokens?: number;
  words: number;
};

type LLMResponse = {
  content: string;
  inputMetrics: MetricsT;
  outputMetrics: MetricsT;
  timeTaken: number;
};

// Initialize clients
const openaiClient = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY,
});

const anthropicClient = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

function countWords(text: string): number {
  return text.split(/\s+/).filter((word) => word.trim().length > 0).length;
}

export async function llm(
  messages: Message[],
  model: string = "gpt-4",
  systemPrompt: string
): Promise<LLMResponse> {
  const startTime = performance.now();

  try {
    // Calculate total input content for word counting
    const totalInputContent = messages.map((m) => m.content).join(" ");

    // Handle Anthropic models
    if (model.startsWith("claude")) {
      const response = await anthropicClient.messages.create({
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

      return {
        content,
        inputMetrics: {
          tokens: response.usage.input_tokens,
          words: countWords(totalInputContent),
        },
        outputMetrics: {
          tokens: response.usage.output_tokens,
          words: countWords(content),
        },
        timeTaken: (performance.now() - startTime) / 1000, // Convert to seconds
      };
    }

    // Handle OpenAI models
    const response = await openaiClient.chat.completions.create({
      model: model,
      messages: messages,
    });

    const content = response.choices[0].message.content || "";

    return {
      content,
      inputMetrics: {
        tokens: response.usage?.prompt_tokens,
        words: countWords(totalInputContent),
      },
      outputMetrics: {
        tokens: response.usage?.completion_tokens,
        words: countWords(content),
      },
      timeTaken: (performance.now() - startTime) / 1000, // Convert to seconds
    };
  } catch (error) {
    console.error(`Error in llm function with model ${model}:`, error);
    throw error;
  }
}
