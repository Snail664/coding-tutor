import { NextResponse } from "next/server";
import { getSession } from "@auth0/nextjs-auth0";
import { openai } from "@/lib/openai";
import { prisma } from "@/lib/prisma";
import { OpenAI } from "openai";

interface GeneralRequestData {
  userQuestion: string;
  chatHistory: { role: string; content: string }[];
}

const SYSTEM_PROMPT = `You are Codey, a friendly and knowledgeable AI coding tutor. Your role is to help users with general programming questions, concepts, and guidance, as well as help them find specific coding questions to practice.

You have access to a list of coding questions with their difficulty levels and tags. When users ask about specific topics or types of questions, you should:

1. For general programming questions:
   - Provide clear, concise, and accurate information
   - Use examples when helpful
   - Break down complex concepts into simpler parts
   - Encourage best practices

2. For questions about finding practice problems:
   - Recommend specific questions from the available list based on:
     * Topic/tags they're interested in
     * Difficulty level they're looking for
     * Their current learning goals
   - Format your response to include question links using the following syntax:
     * For each recommended question, include a link in this format: [Question Name](QUESTION_LINK:Question%20Name)
     * Use the EXACT question name as it appears in the available questions list
     * Example: "Try [Two Sum](QUESTION_LINK:Two%20Sum) for a great introduction to hash maps"
   - Provide a brief description of why you're recommending each question
   - If they ask about a topic we don't have questions for, acknowledge that and suggest related topics we do have

3. Always be supportive and encouraging, focusing on teaching and explanation.

Remember to maintain a helpful and educational tone while keeping responses focused and practical.`;

export async function POST(request: Request) {
  try {
    // Check authentication
    const session = await getSession();
    if (!session?.user) {
      console.log("Unauthorized: No session or user");
      return new Response("Unauthorized", { status: 401 });
    }

    const data: GeneralRequestData = await request.json();
    console.log("Received question:", data.userQuestion);
    
    if (!data.userQuestion) {
      console.log("Missing user question");
      return new Response("Missing user question", { status: 400 });
    }

    // Fetch all questions with their tags
    const questions = await prisma.question.findMany({
      select: {
        name: true,
        difficulty: true,
        tags: {
          select: {
            name: true
          }
        }
      },
      cacheStrategy: { ttl: 3600, swr: 30 },
    });

    // Format questions for the LLM
    const formattedQuestions = questions.map(q => ({
      name: q.name,
      difficulty: q.difficulty,
      tags: q.tags.map(t => t.name)
    }));

    // Prepare messages for the chat completion
    const messages = [
      { 
        role: "system", 
        content: SYSTEM_PROMPT + "\n\nAvailable questions:\n" + 
          JSON.stringify(formattedQuestions, null, 2)
      },
      ...(data.chatHistory || []),
      { role: "user", content: data.userQuestion }
    ];

    console.log("Sending request to OpenAI with messages:", messages);

    // Get completion from OpenAI using the configured instance
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: messages as OpenAI.Chat.ChatCompletionMessageParam[],
      temperature: 0.7,
      max_tokens: 1500,
    });

    const response = completion.choices[0]?.message?.content || "";
    console.log("Received response from OpenAI:", response);

    if (!response) {
      console.log("No response from OpenAI");
      throw new Error("No response from OpenAI");
    }

    return NextResponse.json({
      response: response,
    });

  } catch (error: unknown) {
    console.error("Error in general chat endpoint:", error);
    console.error("Error details:", {
      message: error instanceof Error ? error.message : 'Unknown error',
      response: error instanceof Error ? (error as { response?: { status?: number } }).response : undefined,
      stack: error instanceof Error ? error.stack : undefined
    });
    
    // Handle rate limiting
    if (error instanceof Error && error.message.includes("429")) {
      return new Response("Rate limit exceeded. Please try again later.", {
        status: 429
      });
    }

    // Handle other errors
    return new Response(error instanceof Error ? error.message : "An error occurred", {
      status: error instanceof Error ? (error as { response?: { status?: number } }).response?.status || 500 : 500
    });
  }
} 