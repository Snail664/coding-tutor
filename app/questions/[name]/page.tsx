import { getSession } from "@auth0/nextjs-auth0";
import { prisma } from "@/lib/prisma";
import Walkthrough from "@/components/features/Walkthrough";
import Navbar from "@/components/Navbar";
import AuthStateInitializer from "@/components/features/AuthStateInitializer";
import QuestionLayout from "@/components/features/QuestionLayout";

export default async function QuestionPage({
  params,
}: {
  params: { name: string };
}) {
  const [session, question] = await Promise.all([
    getSession(),
    prisma.question.findUnique({
      where: { name: decodeURIComponent(params.name) },
      include: {
        templateCodes: true,
        testCases: true,
      },
    }),
  ]);

  console.log("question", question);

  let userData = null;
  if (session?.user?.sub) {
    userData = await prisma.user.findUnique({
      where: { auth0_sub: session.user.sub },
      select: {
        auth0_sid: true,
        auth0_sub: true,
        auth0_name: true,
        auth0_email: true,
        auth0_picture: true,
        isWalkthroughEnabled: true,
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
      <Walkthrough />
      <Navbar auth0User={session?.user} />
      <QuestionLayout />
    </div>
  );
}
