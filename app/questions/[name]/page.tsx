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
      cacheStrategy: { ttl: 30, swr: 5 },
    }),
    prisma.question.findMany({
      select: {
        name: true,
        difficulty: true,
      },
      cacheStrategy: { ttl: 30, swr: 5 },
    }),
  ]);

  // fetch user data if logged in
  // Fetch latest user data if user is logged in
  const latestUserData = session?.user
    ? await prisma.user.findUnique({
        where: { auth0_sub: session.user.sub },
        select: {
          auth0_sid: true,
          auth0_sub: true,
          auth0_given_name: true,
          auth0_family_name: true,
          auth0_name: true,
          auth0_picture: true,
          auth0_email: true,
          auth0_email_verified: true,
          isWalkthroughEnabled: true,
        },
      })
    : null;

  // question not found
  if (!question) {
    notFound();
  }

  // user data
  const userData = latestUserData
    ? {
        auth0_sid: session?.user?.sid, // Keep session ID from Auth0
        auth0_sub: latestUserData.auth0_sub,
        auth0_given_name: latestUserData.auth0_given_name,
        auth0_family_name: latestUserData.auth0_family_name,
        auth0_name: latestUserData.auth0_name,
        auth0_picture: latestUserData.auth0_picture,
        auth0_email: latestUserData.auth0_email,
        auth0_email_verified: latestUserData.auth0_email_verified,
        isWalkthroughEnabled: latestUserData.isWalkthroughEnabled, // Use DB value
      }
    : null;

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
      {userData && <AuthStateInitializer user={userData} />}
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
