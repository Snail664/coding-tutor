"use client";

import React, { useState } from "react";
import DifficultyTag from "./QuestionDifficultyTag";
import { QuestionDifficulty } from "@prisma/client";

interface Question {
  name: string;
  difficulty: string;
}

interface Props {
  questions: Question[];
}

export default function FilterableQuestions({ questions }: Props) {
const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
const [searchTerm, setSearchTerm] = useState("");

// Filter questions by selected difficulty and search term.
const filteredQuestions = questions.filter((q) => {
const matchesDifficulty = selectedDifficulty
    ? q.difficulty.toLowerCase() === selectedDifficulty.toLowerCase()
    : true;
const matchesSearch = q.name.toLowerCase().includes(searchTerm.toLowerCase());
return matchesDifficulty && matchesSearch;
});

// Define difficulties as an array of QuestionDifficulty.
  // If your enum doesn't export its values, you can cast your strings:
  const difficulties: QuestionDifficulty[] = ["easy", "medium", "hard"] as QuestionDifficulty[];

  return (
    <div>
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setSelectedDifficulty(null)}
          className={`px-4 py-2 rounded-lg transition-colors ${
            !selectedDifficulty
              ? "bg-primary text-white"
              : "bg-background text-primary hover:bg-primary hover:text-white"
          }`}
        >
          All
        </button>
        {difficulties.map((difficulty) => (
          <button
            key={difficulty}
            onClick={() => setSelectedDifficulty(difficulty)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedDifficulty === difficulty
                ? "bg-primary text-white"
                : "bg-background text-primary hover:bg-primary hover:text-white"
            }`}
          >
            <DifficultyTag difficulty={difficulty} />
            {difficulty}
          </button>
        ))}
      </div>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search questions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
      </div>

    {/* Filtered Question List */}
    <div className="bg-menuBackground w-full max-w-md rounded-xl shadow-lg overflow-hidden mt-5">
        <div className="max-h-96 overflow-y-auto">
        <ul className="divide-y divide-gray-300">
            {filteredQuestions.map((question) => (
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
                <DifficultyTag difficulty={question.difficulty as QuestionDifficulty} />
                </a>
            </li>
            ))}
        </ul>
        </div>
    </div>
    </div>
  );
}
