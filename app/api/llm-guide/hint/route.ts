import { QuestionT, TestResult } from "@/lib/types";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { rateLimitMiddleware } from "@/app/middleware/rateLimitMiddleware";
import { parseLLMResponse } from "@/lib/utils";

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

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: get_hint_system_prompt(data["question"]["content"]),
      },
      {
        role: "user",
        content: get_hint_user_prompt(data["sourceCode"], data["testCases"]),
      },
    ],
  });

  const hintText = parseLLMResponse(completion, "hint");

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

function get_hint_user_prompt(code: string, testCases: TestResult[]) {
  return `
!!<<Student Code>>!!
${code}

!!<<Test Cases>>!!
${testCases
  .map(
    (testCase) => `
description: ${testCase.testCase.description}
input: ${testCase.testCase.input}
actual: ${testCase.actualOutput}
passed: ${testCase.passed ? "Passed" : "Failed"}
error: ${testCase.error}
expected: ${testCase.testCase.expectedOutput}
`
  )
  .join("\n")}
`;
}

function get_hint_system_prompt(question: string) {
  return `
You are a coding teacher. Based on the question given and the student's solution do the following.
1. Determine if the solution is complete or incomplete
2. If solution is complete: Identify the logical errors in the solution (IGNORE syntax errors)
3. If solution is incomplete: determine the likely next step
4. Return a hint which is less than 50 words based on one error the student should rectify or the immediate next step the student should take
5. Your hint should be in a conversational format as though you are a teacher talking to a student
6. When giving your hint, provide a brief text to direct the student to the part of the code you are refering to
7. DO NOT give the correct solution, only give a hint
8. If the answer is correct, encourage the student and let them know it seems more or less correct
9. You are also provided with the test cases the student has run. Use this to determine if the student's solution is correct or not.


Return your answer in the JSON format with the following keys. ONLY RETURN JSON OBJECT. No other text outside it. ENSURE YOU RETURN VALID JSON:
is_complete: <answer boolean>
is_correct: <answer boolean>
errors_or_next_steps: <answer string>
hint: <answer string>

!!<<Question>>!!
${question}
    `;
}
