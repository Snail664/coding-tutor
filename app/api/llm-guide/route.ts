import { NextResponse } from "next/server";
import OpenAI from "openai";

const OPEN_AI_API_KEY = process.env.OPEN_AI_API_KEY;
const openai = new OpenAI({ apiKey: OPEN_AI_API_KEY });

export async function GET() {
  return NextResponse.json({
    message:
      "Post to this endpoint to prompt the openai api to get guidance from the LLM",
  });
}

export async function POST(request: Request) {
  const data = await request.json();

  const messages = [
    { role: "system", content: system_prompt },
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
    model: "gpt-4o",
    messages: messages,
  });

  let responseContent = completion.choices[0].message.content;
  const answerMatch = responseContent?.match(/!!<<Answer>>!!([\s\S]*)/);
  if (answerMatch && answerMatch[1]) {
    responseContent = answerMatch[1].trim();
  } else {
    console.warn("No !!<Answer>!! found in the response");
  }

  return NextResponse.json({ response: responseContent });
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
    6. Return the following to sections: !!<<Thought>>!! for your thought process and !!<<Answer>>!! for your final response to the student.
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
