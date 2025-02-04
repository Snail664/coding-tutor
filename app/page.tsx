import { getSession } from "@auth0/nextjs-auth0";
import DifficultyTag from "@/components/features/Question/QuestionDifficultyTag";
import { prisma } from "@/lib/prisma";

export default async function Page() {
  const session = await getSession();
  const questions = await prisma.question.findMany({
    select: {
      name: true,
      difficulty: true,
    },
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-200 to-purple-200 p-6">
      <h1 className="text-6xl font-extrabold text-white mb-10 drop-shadow-lg">
        Coding Tutor
      </h1>
      {session ? (
        <div className="bg-white w-full max-w-md rounded-xl shadow-lg overflow-hidden">
          <div className="max-h-96 overflow-y-auto">
            <ul className="divide-y divide-gray-200">
              {questions.map((question) => (
                <li
                  key={question.name}
                  className="hover:bg-gray-100 transition"
                >
                  <a
                    href={`/questions/${question.name}`}
                    className="p-4 flex justify-between items-center"
                  >
                    <span className="text-gray-800 font-medium">
                      {question.name}
                    </span>
                    <DifficultyTag difficulty={question.difficulty} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <a
          href="/api/auth/login"
          className="inline-block bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-3 px-8 rounded-full shadow-xl transition duration-300 transform hover:scale-105"
        >
          Login
        </a>
      )}
    </div>
  );
}
