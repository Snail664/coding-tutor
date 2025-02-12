import { QuestionDifficulty } from "@prisma/client";

export default function QuestionDifficultyTag({
  difficulty,
}: {
  difficulty: QuestionDifficulty;
}) {
  let colorClass = "";

  switch (difficulty.toLowerCase()) {
    case QuestionDifficulty.easy:
      colorClass = "bg-emerald-300 text-emerald-800";
      break;
    case QuestionDifficulty.medium:
      colorClass = "bg-amber-300 text-amber-800";
      break;
    case QuestionDifficulty.hard:
      colorClass = "bg-rose-300 text-rose-800";
      break;
    default:
      colorClass = "bg-gray-300 text-white";
  }

  return (
    <span
      className={`px-2 py-0.5 rounded text-xs font-semibold inline-block ${colorClass}`}
      style={{ minWidth: "60px", textAlign: "center" }}
    >
      {difficulty}
    </span>
  );
}
