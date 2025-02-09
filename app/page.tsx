import { getSession } from "@auth0/nextjs-auth0";
import DifficultyTag from "@/components/features/Question/QuestionDifficultyTag";
import { prisma } from "@/lib/prisma";
import Navbar from "@/components/Navbar";

export default async function Page() {
  const session = await getSession();
  const questions = await prisma.question.findMany({
    select: {
      name: true,
      difficulty: true,
    },
    cacheStrategy: { ttl: 3600, swr: 30 },
  });

  return (
    <div className="px-5">
      <Navbar auth0User={session?.user} hideMiddle={true} />
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6">
        <div className="inline-block text-center mb-10">
          <h1 className="text-6xl font-extrabold text-primary drop-shadow-lg">
            Coding Tutor
          </h1>
          <p className="text-lg text-primary mt-2">
            Powered by Codey, the AI. Codey will help you when you&apos;re stuck
            with a bug or don&apos;t know how to continue.
          </p>
        </div>
        {session ? null : (
          <a
            href="/api/auth/login"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full shadow-xl transition duration-300 transform hover:scale-105"
          >
            Get Started
          </a>
        )}
        <div className="bg-menuBackground w-full max-w-md rounded-xl shadow-lg overflow-hidden mt-5">
          <div className="max-h-96 overflow-y-auto">
            <ul className="divide-y divide-gray-300">
              {questions.map((question) => (
                <li
                  key={question.name}
                  className="hover:bg-background transition"
                >
                  <a
                    href={`/questions/${question.name}`}
                    className="p-4 flex justify-between items-center"
                  >
                    <span className="text-primary font-medium">
                      {question.name}
                    </span>
                    <DifficultyTag difficulty={question.difficulty} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
