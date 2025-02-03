import { NextResponse } from "next/server";
import OpenAI from "openai";
import { rateLimitMiddleware } from "@/app/middleware/rateLimitMiddleware";
import { parseLLMResponse } from "@/lib/utils";
const OPEN_AI_API_KEY = process.env.OPEN_AI_API_KEY;
const openai = new OpenAI({ apiKey: OPEN_AI_API_KEY });

export async function GET() {
  return NextResponse.json({
    message:
      "Post to this endpoint to prompt the openai api to get guidance from the LLM",
  });
}

export async function POST(request: Request) {
  try {
    const { error, response } = await rateLimitMiddleware(request, "chat");
    if (error) return response;
    const data = await request.json();

    const messages = [
      { role: "user", content: system_prompt },
      ...(data.chatHistory || []),
      {
        role: "user",
        content: get_gpt_prompt(
          data["question"].content,
          data["sourceCode"],
          data["userAudioTranscript"]
        ),
      },
    ];

    const completion = await openai.chat.completions.create({
      model: "o1-mini",
      messages: messages,
    });

    console.log(
      "prompt: ",
      get_gpt_prompt(
        data["question"]["content"],
        data["sourceCode"],
        data["userAudioTranscript"]
      )
    );

    const responseContent = parseLLMResponse(completion, "answer");
    console.log("responseContent: ", responseContent);

    return NextResponse.json({ response: responseContent });
  } catch (e: any) {
    console.log("error: ", e);
    return NextResponse.json({ error: e.message });
  }
}

const system_prompt = `    
    You are a Live AI Coding Tutor. Respond to the student based on the information and rules provided.

    Information:
    Section 1. Question: question that the student has been asked
    Section 2. Source Code: the current state of the student's solution
    Section 3. Student Comments: an audio transcript of what the student is saying to you

    Rules:
    1. If student asks for general syntax or language help, then provide a short and direct answer.
    2. If the student asks for help with debugging, then provide a short and direct answer.
    3. If the student asks for help in general, ask them to phrase a specific question.
    4. If the student asks an irrelevant question, politely decline.
    5. In all other cases, break down the student's main question into several steps and ask them 
       follow-up questions one at a time to guide the student. Make sure your questions help the student
       understand the original question, one step at a time.
    6. Return a json object with the following keys:
       - thought: <for your thought process on which rules apply and how to respond>
       - answer: <for your final response to the student>
`;

function get_gpt_prompt(
  question: string,
  source_code: string,
  user_audio_transcript: string
) {
  return `
    !!<<Section 1>>!!
    ${question}

    !!<<Section 2>>!!
    ${source_code}

    !!<<Section 3>>!!
    ${user_audio_transcript}
  `;
}
