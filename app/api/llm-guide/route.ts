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
    const prompt = get_gpt_prompt(
      data["question"].content,
      data["sourceCode"],
      data["userAudioTranscript"]
    );

    const promise_a = callOpenAI(
      prompt_a,
      prompt,
      data["chatHistory"],
      "gpt-4o-mini"
    );
    const promise_b = callOpenAI(
      prompt_b,
      prompt,
      data["chatHistory"],
      "gpt-4o-mini"
    );
    const promise_c = callOpenAI(
      prompt_c,
      prompt,
      data["chatHistory"],
      "gpt-4o"
    );
    const promise_d = callOpenAI(
      prompt_d,
      prompt,
      data["chatHistory"],
      "gpt-4o"
    );

    const response_a = await promise_a;
    if (response_a.should_reply) {
      return NextResponse.json({ response: response_a.reply });
    }

    const response_b = await promise_b;
    if (response_b.should_reply) {
      return NextResponse.json({ response: response_b.reply });
    }

    const response_c = await promise_c;
    if (response_c.should_reply) {
      return NextResponse.json({ response: response_c.reply });
    }

    // just return the last response no matter what
    const response_d = await promise_d;
    return NextResponse.json({ response: response_d.reply });
  } catch (e: unknown) {
    const error = e as Error;
    console.log("error: ", error);
    return NextResponse.json({ error: error.message });
  }
}

// handle greetings and general niceties
const prompt_a = `
You are an AI Coding Tutor. You are given the following information:
- Coding Problem: coding problem that student is solving
- Source Code: the current state of the student's solution
- Student Question: an audio transcript of what the student is saying to you

Your task is to determine if the student question is a greeting or general nicety.
If the question is a greeting or general nicety, politely respond with a greeting and ask the student if they have a specific question about the coding problem.
If the question is not a greeting or general nicety, then just return an empty string in the reply field.

Return only a JSON object with the following keys:
- thought: <for your thought process on whether the student is greeting or general nicety>
- should_reply: <boolean which is true if the student is greeting or general nicety>
- reply: <if should_reply is true, politely respond with a greeting and ask the student if they have a specific question about the coding problem. If should_reply is false, then just return an empty string>
`;

// handle irrelevant questions
const prompt_b = `
You are an AI Coding Tutor. You are given the following information:
- Coding Problem: coding problem that student is solving
- Source Code: the current state of the student's solution
- Student Question: an audio transcript of what the student is saying to you

Your task is to determine if the student question is irrelevant to the coding problem.
If the question is irrelevant, politely decline the student's question and ask them to focus on the coding problem.
If the question is relevant, then just return an empty string in the reply field.
Questions that are asking for the full solution to the problem are irrelevant.

Return only a JSON object with the following keys:
- thought: <for your thought process on whether the question is relevant to the coding problem>
- should_reply: <boolean which is true if question is irrelevant to the coding problem>
- reply: <if should_reply is true, politely decline the question and ask the student to focus on the coding problem. If should_reply is false, then just return an empty string>
`;

// handle syntax or language help
const prompt_c = `
You are an AI Coding Tutor. You are given the following information:
- Coding Problem: coding problem that student is solving
- Source Code: the current state of the student's solution
- Student Question: an audio transcript of what the student is saying to you

Your task is to determine if the student is asking for syntax or generic language help.
If the student is asking for syntax or generic language help, then provide a short and direct answer with a simple code snippet of the syntax.
If the student is not asking for syntax or generic language help, then just return an empty string in the reply field.
Do not entertain questions that are not syntax or generic language help, especially if student is asking for the full solution.

Return only a JSON object with the following keys:
- thought: <for your thought process on whether the student is asking for syntax or language help>
- should_reply: <boolean which is true if the student is asking for syntax or language help>
- reply: <if should_reply is true, provide a short and direct answer. If should_reply is false, then just return an empty string>
`;

// handle syntax or language help
const prompt_d = `
You are an AI Coding Tutor. You are given the following information:
- Coding Problem: coding problem that student is solving
- Source Code: the current state of the student's solution
- Student Question: an audio transcript of what the student is saying to you

Understand the student's question and break it down into smaller steps.
Your task is to guide the student to the correct answer without explicitly telling them the solution.
Make sure your questions help the student understand the original question, one step at a time.
Based on the immediate next step the student should take, ask the student a follow-up question that will prompt them in the right direction.

Return only a JSON object with the following keys:
- thought: <for your thought process on the steps the student should take>
- reply: <for your final response to the student based on the immediate next step they should take>
`;

// keep this old prompt for now to write in the report and test whether new approach is really faster and better.
// const system_prompt = `
//     You are a Live AI Coding Tutor. Respond to the student based on the information and rules provided.

//     Information:
//     Section 1. Question: question that the student has been asked
//     Section 2. Source Code: the current state of the student's solution
//     Section 3. Student Comments: an audio transcript of what the student is saying to you

//     Rules:
//     1. If student asks for general syntax or language help, then provide a short and direct answer.
//     2. If the student asks for help with debugging, then provide a short and direct answer.
//     3. If the student asks for help in general, ask them to phrase a specific question.
//     4. If the student asks an irrelevant question, politely decline.
//     5. In all other cases, break down the student's main question into several steps and ask them
//        follow-up questions one at a time to guide the student. Make sure your questions help the student
//        understand the original question, one step at a time.
//     6. Return a json object with the following keys:
//        - thought: <for your thought process on which rules apply and how to respond>
//        - answer: <for your final response to the student>
// `;

function get_gpt_prompt(
  question: string,
  source_code: string,
  user_audio_transcript: string
) {
  return `
    !!<<Coding Problem>>!!
    ${question}

    !!<<Source Code>>!!
    ${source_code}

    !!<<Student Question>>!!
    ${user_audio_transcript}
  `;
}
