import { getSession } from "@auth0/nextjs-auth0";
import { prisma } from "@/lib/prisma";

interface FeedbackRequestData {
  systemPromptUsed: string;
  userPromptUsed: string;
  LLMOutput: string;
  feedbackType: "hint" | "chat" | "general";
  feedbackText: string;
  questionName: string;
}

export async function POST(req: Request) {
  const session = await getSession();
  const user = session?.user;

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  let data: FeedbackRequestData;
  try {
    data = await req.json();
  } catch (error) {
    console.error("Error parsing feedback data:", error);
    return new Response("Invalid JSON data", { status: 400 });
  }

  // Validate the feedback data
  if (
    typeof data.systemPromptUsed !== "string" ||
    data.systemPromptUsed.trim() === "" ||
    typeof data.userPromptUsed !== "string" ||
    data.userPromptUsed.trim() === "" ||
    typeof data.LLMOutput !== "string" ||
    data.LLMOutput.trim() === "" ||
    typeof data.feedbackText !== "string" ||
    data.feedbackText.trim() === "" ||
    typeof data.feedbackType !== "string" ||
    !["hint", "chat", "general"].includes(data.feedbackType) ||
    typeof data.questionName !== "string" ||
    data.questionName.trim() === ""
  ) {
    console.error("Invalid feedback data:", data);
    return new Response("Invalid feedback data", { status: 400 });
  }

  try {
    await prisma.feedback.create({
      data: {
        userId: user.sub,
        systemPromptUsed: data.systemPromptUsed,
        userPromptUsed: data.userPromptUsed,
        LLMOutput: data.LLMOutput,
        feedbackType: data.feedbackType,
        feedbackText: data.feedbackText,
        questionName: data.questionName,
      },
    });

    return new Response("Feedback submitted successfully", { status: 200 });
  } catch (error) {
    console.error("Error submitting feedback:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
