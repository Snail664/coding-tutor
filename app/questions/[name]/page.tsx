import { getSession } from "@auth0/nextjs-auth0";
import { prisma } from "@/lib/prisma";
import Walkthrough from "@/components/features/Walkthrough";
import Navbar from "@/components/Navbar";
import AuthStateInitializer from "@/components/features/AuthStateInitializer";
import QuestionLayout from "@/components/features/QuestionLayout";
import QuestionStateInitializer from "@/components/QuestionStateInitializer";
import AssistantStateInitializer from "@/components/AssistantStateInitializer";
import { MessageT } from "@/lib/types";
import CodeStateInitializer from "@/components/CodeStateInitializer";
import { notFound } from "next/navigation";

export default async function QuestionPage({
  params,
}: {
  params: { name: string };
}) {
  const [session, question, allQuestionsMeta] = await Promise.all([
    getSession(),
    prisma.question.findUnique({
      where: { name: decodeURIComponent(params.name) },
      include: {
        templateCodes: true,
        testCases: true,
        tags: true,
      },
      cacheStrategy: { ttl: 3600, swr: 30 },
    }),
    prisma.question.findMany({
      select: {
        name: true,
        difficulty: true,
        tags: true,
      },
      cacheStrategy: { ttl: 3600, swr: 30 },
    }),
  ]);

  // question not found
  if (!question) {
    notFound();
  }

  // user data
  const userData = {
    auth0_sid: session?.user?.sid,
    auth0_sub: session?.user?.sub,
    auth0_given_name: session?.user?.given_name,
    auth0_family_name: session?.user?.family_name,
    auth0_name: session?.user?.name,
    auth0_picture: session?.user?.picture,
    auth0_email: session?.user?.email,
    auth0_email_verified: session?.user?.email_verified,
    isWalkthroughEnabled: session?.user?.isWalkthroughEnabled,
  };

  // create a chat for the user if logged in.
  let chat = null;
  const messages: MessageT[] = [];
  if (session?.user?.sub) {
    messages.push({
      role: "assistant",
      content: `Chat started for question ${question?.name}`,
    });
    chat = await prisma.chat.create({
      data: {
        userId: session.user.sub,
        messages: {
          create: messages,
        },
      },
    });
  }

  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
      }}
    >
      {userData && <AuthStateInitializer />}
      {question && (
        <>
          <QuestionStateInitializer
            question={{
              ...question,
              testCases: question.testCases.map((tc) => ({
                input: JSON.parse(tc.input),
                expectedOutput: JSON.parse(tc.expectedOutput),
                description: tc.description,
              })),
            }}
            questionList={allQuestionsMeta}
          />
          <CodeStateInitializer
            question={{
              ...question,
              testCases: question.testCases.map((tc) => ({
                input: JSON.parse(tc.input),
                expectedOutput: JSON.parse(tc.expectedOutput),
                description: tc.description,
              })),
            }}
          />
        </>
      )}
      {chat && (
        <AssistantStateInitializer chatid={chat.id} messages={messages} />
      )}
      <Walkthrough />
      <Navbar auth0User={session?.user} />
      <QuestionLayout />
    </div>
  );
}
