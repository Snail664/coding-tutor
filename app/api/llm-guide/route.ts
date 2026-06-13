import { NextResponse } from "next/server";
import { rateLimitMiddleware } from "@/app/middleware/rateLimitMiddleware";
import { getTutorSystemPrompt, getTutorUserPrompt } from "@/lib/prompts";
import { LLM, Message, LLMError } from "@/lib/llm";

const llm = new LLM({
  provider: "anthropic",
  model: "claude-sonnet-4-6",
});

export async function GET() {
  return NextResponse.json({
    message:
      "Post to this endpoint to prompt the openai api to get guidance from the LLM",
  });
}

async function callLLM(
  system_prompt: string,
  prompt: string,
  chat_history: Message[]
) {
  const messages = [
    ...chat_history,
    { role: "user" as const, content: prompt },
  ];

  const response = await llm.generate<{ reply: string }>(
    messages,
    system_prompt
  );

  console.log("debug llm response: ", response);

  return {
    should_reply: true,
    reply: response.content.reply,
  };
}

export async function POST(request: Request) {
  try {
    const { error, response } = await rateLimitMiddleware(request, "chat");
    if (error) return response;

    const data = await request.json();

    try {
      const tutorSystemPrompt = getTutorSystemPrompt(data["question"].content);
      const tutorUserPrompt = getTutorUserPrompt(
        data["sourceCode"],
        data["userAudioTranscript"]
      );

      const response_a = await callLLM(
        tutorSystemPrompt,
        tutorUserPrompt,
        data["chatHistory"]
      );

      return NextResponse.json({ response: response_a.reply });
    } catch (error) {
      if (error instanceof LLMError) {
        return NextResponse.json(
          {
            error: error.message,
            type: error.type,
            retryable: error.retryable,
          },
          { status: error.type === "RATE_LIMIT" ? 429 : 500 }
        );
      }
      throw error;
    }
  } catch (e: unknown) {
    const error = e as Error;
    console.error("Error in llm-guide:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
