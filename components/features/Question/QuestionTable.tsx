"use client";

import { QuestionDifficulty } from "@prisma/client";
import DifficultyTag from "./QuestionDifficultyTag";

export default function QuestionTable({
  questions,
}: {
  questions: { name: string; difficulty: QuestionDifficulty }[];
}) {
  return (
    <div className="bg-menuBackground w-full max-w-md rounded-xl shadow-lg overflow-hidden mt-5">
      <div className="max-h-96 overflow-y-auto">
        <ul className="divide-y divide-gray-300">
          {questions.map((question) => (
            <li key={question.name} className="hover:bg-background transition">
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
  );
}
