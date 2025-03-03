import { NextResponse } from "next/server";
import { rateLimitMiddleware } from "@/app/middleware/rateLimitMiddleware";
import { parseJSON } from "@/lib/utils";
import { getTutorSystemPrompt, getTutorUserPrompt } from "@/lib/prompts";
import { llm } from "@/lib/llm";

export async function GET() {
  return NextResponse.json({
    message:
      "Post to this endpoint to prompt the openai api to get guidance from the LLM",
  });
}

async function callLLM(
  system_prompt: string,
  prompt: string,
  chat_history: Array<{
    role: "user" | "assistant";
    content: string;
  }>
) {
  const messages = [
    ...chat_history,
    { role: "user" as const, content: prompt },
  ];

  const response = await llm(
    messages,
    "claude-3-5-sonnet-20240620",
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

    const tutorSystemPrompt = getTutorSystemPrompt(data["question"].content);
    const tutorUserPrompt = getTutorUserPrompt(
      data["sourceCode"],
      data["userAudioTranscript"]
    );

    const promise_a = callLLM(
      tutorSystemPrompt,
      tutorUserPrompt,
      data["chatHistory"]
    );

    const response_a = await promise_a;
    return NextResponse.json({ response: response_a.reply });
  } catch (e: unknown) {
    const error = e as Error;
    console.log("error: ", error);
    return NextResponse.json({ error: error.message });
  }
}
