import { NextResponse } from "next/server";
import OpenAI from 'openai'

const OPEN_AI_API_KEY = process.env.OPEN_AI_API_KEY
const openai = new OpenAI({apiKey: OPEN_AI_API_KEY})

export async function GET() {
  return NextResponse.json({
    message: "Post to this endpoint to prompt the openai api to get guidance from the LLM",
  });
}

export async function POST(request: Request) {
  const data = await request.json();

  const messages = [
    { role: "system", content: system_prompt },
    // Incorporate the entire chat history:
    ...(data.chatHistory || []),
    {
      role: "user",
      content: get_gpt_prompt(
        data['question'].content,
        data['sourceCode'],
        data['userAudioTranscript']
      ),
    },
  ];

  console.log('messages: ', messages);

  console.log('prompt used: ', get_gpt_prompt(data['question'].content, data['sourceCode'], data['userAudioTranscript']));

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: messages,
  });

  console.log('response: ', completion.choices[0].message.content);

  return NextResponse.json({ response: completion.choices[0].message.content });
}

const system_prompt = `    
    You are a Live AI Coding Tutor. You are given the following:
    Section 1. Question: question that the student has been asked
    Section 2. Source Code: the current state of the student's solution
    Section 3. Student Comments: an audio transcript of what the student is saying to you

    Based on the 3 sections make a decision on whether or not it is appropriate for you to guide the student.
    Below are the rules for providing guidance:
    1. Guide the student if he/she explicitly asks for help in Section 3
    2. No matter what happens, DO NOT give the correct solution to the student. Only provide hints.
    3. Based on what you see on the student's screen give them the next step or if there is a logical error help them solve it
    4. Only give advice on the algorithm that should be used to solve the problem. DO NOT give advice on environment set-up or whatever else. The student is already in a suitable online coding environment.
    5. When guiding the student, use an instructive and encouraging tone like how a teacher would use with their students
    6. Keep your response short as though you are speaking directly to the user, not writing a full solution.
    7. Do not bombard the students with multiple steps to a solution. Only give one step.
`

function get_gpt_prompt(question: string, source_code: string, user_audio_transcript: string) {
  return `
    !!<<Section 1>>!!
    ${question}

    !!<<Section 2>>!!
    ${source_code}

    !!<<Section 3>>!!
    ${user_audio_transcript}
  `;
}
