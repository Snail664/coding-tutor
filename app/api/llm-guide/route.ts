import { NextResponse } from "next/server";
import OpenAI from "openai";
import { rateLimitMiddleware } from "@/app/middleware/rateLimitMiddleware";
import { parseLLMResponse } from "@/lib/utils";
import { getTutorSystemPrompt, getTutorUserPrompt } from "@/lib/prompts";

const OPEN_AI_API_KEY = process.env.OPEN_AI_API_KEY;
const openai = new OpenAI({ apiKey: OPEN_AI_API_KEY });

export async function GET() {
  return NextResponse.json({
    message:
      "Post to this endpoint to prompt the openai api to get guidance from the LLM",
  });
}

async function callOpenAI(
  system_prompt: string,
  prompt: string,
  chat_history: Array<{
    role: "system" | "user" | "assistant";
    content: string;
  }>,
  model: string
) {
  const messages = [
    { role: "user" as const, content: system_prompt },
    ...chat_history,
    { role: "user" as const, content: prompt },
  ];

  const completion = await openai.chat.completions.create({
    model,
    messages,
  });

  console.log("completion: ", completion.choices[0].message.content);

  return {
    should_reply: parseLLMResponse(completion, "should_reply"),
    reply: parseLLMResponse(completion, "reply"),
  };
}

export async function POST(request: Request) {
  try {
    const { error, response } = await rateLimitMiddleware(request, "chat");
    if (error) return response;
    const data = await request.json();

    const tutorSystemPrompt = getTutorSystemPrompt();
    const tutorUserPrompt = getTutorUserPrompt(
      data["question"].content,
      data["sourceCode"],
      data["userAudioTranscript"]
    );

    const promise_a = callOpenAI(
      tutorSystemPrompt,
      tutorUserPrompt,
      data["chatHistory"],
      "o3-mini"
    );

    const response_a = await promise_a;
    return NextResponse.json({ response: response_a.reply });
  } catch (e: unknown) {
    const error = e as Error;
    console.log("error: ", error);
    return NextResponse.json({ error: error.message });
  }
}
