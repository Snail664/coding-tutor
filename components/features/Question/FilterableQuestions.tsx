"use client";

import React, { useState } from "react";
import DifficultyTag from "./QuestionDifficultyTag";
import { QuestionDifficulty } from "@prisma/client";
import { Search as SearchIcon, Filter as FilterIcon } from "lucide-react";

interface Question {
  name: string;
  difficulty: string;
}

interface Props {
  questions: Question[];
}

export default function FilterableQuestions({ questions }: Props) {
const [showFilters, setShowFilters] = useState(false);
// const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
const [searchTerm, setSearchTerm] = useState("");

// Filter questions by selected difficulty and search term.
// const filteredQuestions = questions.filter((q) => {
// const matchesDifficulty = selectedDifficulty
//     ? q.difficulty.toLowerCase() === selectedDifficulty.toLowerCase()
//     : true;
// const matchesSearch = q.name.toLowerCase().includes(searchTerm.toLowerCase());
// return matchesDifficulty && matchesSearch;
// });
// // Define difficulties as an array of QuestionDifficulty.
//   // If your enum doesn't export its values, you can cast your strings:
//   const difficulties: QuestionDifficulty[] = ["easy", "medium", "hard"] as QuestionDifficulty[];

  const filteredQuestions = questions.filter((question) =>
    question.name.toLowerCase().includes(searchTerm.toLowerCase())
  ); 

  return (
    <>
      {/* Search Bar + Filter Button */}
      <div className="flex items-center gap-2 mb-4 w-full max-w-md">
        {/* Search Input */}
        <div className="relative flex-1">
          <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Search questions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-10 py-2 border border-gray-300 rounded focus:outline-none"
          />
        </div>

        {/* Filter Button */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center justify-center w-10 h-10 bg-background text-primary border border-gray-300 rounded hover:bg-primary hover:text-white transition"
        >
          <FilterIcon className="h-4 w-4" />
        </button>
      </div>

      {/* Conditionally render any extra filter UI */}
      {showFilters && (
        <div className="mb-4 w-full max-w-md">
          <p className="text-primary font-medium">Filter options go here</p>
          {/* For example, difficulty buttons, date pickers, etc. */}
        </div>
      )}

      {/* Render the filtered question list */}
      <div className="bg-menuBackground w-full max-w-md rounded-xl shadow-lg overflow-hidden mt-5">
        <div className="max-h-96 overflow-y-auto">
          <ul className="divide-y divide-gray-300">
            {filteredQuestions.map((question) => (
              <li key={question.name} className="hover:bg-background transition">
                <a
                  href={`/questions/${question.name}`}
                  className="p-4 flex justify-between items-center"
                >
                  <span className="text-primary font-medium">{question.name}</span>
                  <DifficultyTag difficulty={question.difficulty as QuestionDifficulty} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
