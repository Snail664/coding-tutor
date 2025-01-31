import { QuestionT } from "@/lib/types";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const OPEN_AI_API_KEY = process.env.OPEN_AI_API_KEY;
const openai = new OpenAI({ apiKey: OPEN_AI_API_KEY });

// Handle GET requests
export async function GET() {
  return NextResponse.json({
    message:
      "Post to this endpoint to prompt the openai api to get guidance from the lLM",
  });
}

interface ProactiveRequestData {
  question: QuestionT;
  sourceCode: string;
  previousHint: string;
}

// Handle POST requests (if needed)
export async function POST(request: Request) {
  const data: ProactiveRequestData = await request.json();

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: get_proactive_system_prompt(data["question"]["content"]),
      },
      {
        role: "user",
        content: get_proactive_user_prompt(
          data["sourceCode"],
          data["previousHint"]
        ),
      },
    ],
  });

  console.log("debug proactive message: ", completion.choices[0].message);

  const llmResponse = parse_result(completion);

  if (llmResponse === "") {
    return NextResponse.json({
      proactiveFeedback: "",
      audioProactiveFeedbackBase64: "",
    });
  }

  // Convert the text hint into speech
  const speechResponse = await openai.audio.speech.create({
    input: llmResponse,
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
    proactiveFeedback: llmResponse,
    audioProactiveFeedbackBase64: base64Audio,
  });
}

function get_proactive_user_prompt(code: string, previousHint: string) {
  return `
!!<<Student Code>>!!
${code}

!!<<Previous Hint>>!!
${previousHint}
`;
}

function get_proactive_system_prompt(question: string) {
  return `
You are a coding teacher whoose job is to provide positive encouragement to the student.
You are given the following information:
1. The question the student is trying to solve
2. The student's code
3. The previous hint the student has received

Based on this information, check if the student has correctly implemented the hint.
If the student has correctly implemented the hint, provide positive feedback to the student in a short sentence that emphasizes the concept they have gotten right.
If the student has not yet implemented the hint, or wrongly implement it then say nothing and return an empty string.

Return your answer in the JSON format with the following keys. ONLY RETURN JSON OBJECT. No other text outside it. ENSURE YOU RETURN VALID JSON:
thought_process: <your thought process on whether the hint is implemented correctly>
is_hint_implemented: <answer boolean>
positive_feedback: <answer string>

!!<<Question>>!!
${question}
    `;
}

function parse_result(result: OpenAI.Chat.Completions.ChatCompletion) {
  try {
    const content = result.choices[0].message.content;
    if (content) {
      return JSON.parse(content.slice(8, -4))["positive_feedback"];
    }
  } catch {
    const content = result.choices[0].message.content;
    if (content) {
      return JSON.parse(content)["positive_feedback"];
    }
  }
}
