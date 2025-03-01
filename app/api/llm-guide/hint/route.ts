import { QuestionT, TestResult } from "@/lib/types";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { rateLimitMiddleware } from "@/app/middleware/rateLimitMiddleware";
import { parseJSON } from "@/lib/utils";
import { getHintSystemPrompt, getHintUserPrompt } from "@/lib/prompts";
import { llm } from "@/lib/llm";

const OPEN_AI_API_KEY = process.env.OPEN_AI_API_KEY;
const openai = new OpenAI({ apiKey: OPEN_AI_API_KEY });

// Handle GET requests
export async function GET() {
  return NextResponse.json({
    message:
      "Post to this endpoint to prompt the openai api to get guidance from the lLM",
  });
}

interface HintRequestData {
  question: QuestionT;
  sourceCode: string;
  testCases: TestResult[];
}

// Handle POST requests (if needed)
export async function POST(request: Request) {
  const { error, response } = await rateLimitMiddleware(request, "hint");
  if (error) return response;
  const data: HintRequestData = await request.json();

  const completion = await llm(
    [
      {
        role: "user",
        content: getHintUserPrompt(data.sourceCode, data.testCases),
      },
    ],
    "claude-3-5-sonnet-20241022",
    getHintSystemPrompt(data.question.content)
  );

  const hintText = parseJSON(completion.content)["hint"];

  // const completion = await openai.chat.completions.create({
  //   model: "gpt-4o",
  //   messages: [
  //     {
  //       role: "system",
  //       content: getHintSystemPrompt(data["question"]["content"]),
  //     },
  //     {
  //       role: "user",
  //       content: getHintUserPrompt(data["sourceCode"], data["testCases"]),
  //     },
  //   ],
  // });

  // const hintText = parseLLMResponse(completion, "hint");

  // Convert the text hint into speech
  const speechResponse = await openai.audio.speech.create({
    input: hintText,
    model: "tts-1",
    voice: "nova",
  });

  const audioBlob = await speechResponse.blob();
  const arrayBuffer = await audioBlob.arrayBuffer();
  const byteArray = new Uint8Array(arrayBuffer);

  let binaryString = "";
  for (let i = 0; i < byteArray.length; i++) {
    binaryString += String.fromCharCode(byteArray[i]);
  }
  const base64Audio = btoa(binaryString);

  return NextResponse.json({
    textHint: hintText,
    audioHintBase64: base64Audio,
  });
}
