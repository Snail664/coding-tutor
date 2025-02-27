"use client";

import React, { useState } from "react";
import DifficultyTag from "./QuestionDifficultyTag";
import { QuestionDifficulty } from "@prisma/client";
import { Search as SearchIcon, Filter as FilterIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface Question {
  name: string;
  difficulty: string;
  topics?: string[]; // If you have a topics field
}

interface Props {
  questions: Question[];
}

export default function FilterableQuestions({ questions }: Props) {
  const allTopics = [
    "Array",
    "String",
    "Hash Table",
    "Dynamic Programming",
    "Math",
    "Sorting",
    "Greedy",
    "Depth-First Search",
    "Binary Search",
    "Database",
    "Matrix",
    "Tree",
    // ...etc.
  ];

  // === State for Filters ===
  const [showFilters, setShowFilters] = useState(false);
  // Search bar (for question names)
  const [searchTerm, setSearchTerm] = useState("");

  // Difficulty filters
  const [difficultyCondition, setDifficultyCondition] = useState<"is" | "is not">("is");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);

  // Topics filters (shown in UI, but not fully implemented)
  const [topicsSearchTerm, setTopicsSearchTerm] = useState("");
  const [topicsCondition, setTopicsCondition] = useState<"is" | "is not">("is");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

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

  const visibleTopics = allTopics.filter((topic) =>
    topic.toLowerCase().includes(topicsSearchTerm.toLowerCase())
  );

  // === Toggling a Topic Chip ===
  function toggleTopic(topic: string) {
    setSelectedTopics((prev) => 
      prev.includes(topic) ? prev.filter((t) => t !== topic) // remove if selected
      : [...prev, topic]               // add if not selected
    );
  }

// === FILTERING LOGIC ===
  const filteredQuestions = questions.filter((question) => {
    const matchesSearch = question.name.toLowerCase().includes(searchTerm.toLowerCase());
    // Difficulty filter
    let matchesDifficulty = true;
    if (selectedDifficulty) {
      if (difficultyCondition === "is") {
        matchesDifficulty = question.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();
      } else {
        // "is not"
        matchesDifficulty = question.difficulty.toLowerCase() !== selectedDifficulty.toLowerCase();
      }
  };

  // Topics filter (currently not applied; feel free to implement later)
    let matchesTopics = true;
    if (selectedTopics.length > 0 && question.topics) {
      if (topicsCondition === "is") {
        matchesTopics = selectedTopics.some((topic) => question.topics!.includes(topic));
      } else {
        matchesTopics = !selectedTopics.some((topic) => question.topics!.includes(topic));
      }
    }

  // Return the combined result of all filters
  return matchesSearch && matchesDifficulty && matchesTopics;
});



// === RESET FUNCTION ===
function handleReset() {
  setSearchTerm("");
  setDifficultyCondition("is");
  setSelectedDifficulty(null);
  setTopicsCondition("is");
  setTopicsSearchTerm("");
  setSelectedTopics([]);
}

  return (
    <div className="w-full max-w-md">
      {/* Search Bar + Filter Button */}
      <div className="flex items-center gap-2 mb-4">
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
          title="Filter"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center justify-center w-10 h-10 bg-background text-primary border border-gray-300 rounded hover:bg-primary hover:text-white transition"
        >
          <FilterIcon className="h-4 w-4" />
        </button>
      </div>

      {/* === Filter Panel === */}
      {showFilters && (
        <div className="mb-4 p-4 border border-gray-600 rounded space-y-4">
          {/* Difficulty Row */}
          <div className="flex items-center gap-2">
            <label className="w-24 text-primary font-medium flex items-center gap-1">
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="far"
              data-icon="gauge-max"
              className="svg-inline--fa fa-gauge-max w-10 h-5"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M256 464a208 208 0 1 0 0-416 208 208 0 1 0 0 416zM256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zm32 112a32 32 0 1 1 -64 0 32 32 0 1 1 64 0zM256 408c-30.9 0-56-25.1-56-56s25.1-56 56-56c10.3 0 19.9 2.8 28.2 7.6l110.2-75.4c10.9-7.5 25.9-4.7 33.4 6.3s4.7 25.9-6.3 33.4L311.3 343.2c.4 2.9 .7 5.8 .7 8.8c0 30.9-25.1 56-56 56zM384 160a32 32 0 1 1 -64 0 32 32 0 1 1 64 0zM112 224a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm80-64a32 32 0 1 1 -64 0 32 32 0 1 1 64 0z"
              />
            </svg>
                Difficulty
              </label>
            <select
              value={difficultyCondition}
              onChange={(e) =>
                setDifficultyCondition(e.target.value as "is" | "is not")
              }
              className="relative -right-5 border border-gray-300 rounded px-2 py-1"
            >
              <option value="is">is</option>
              <option value="is not">is not</option>
            </select>
            <select
              value={selectedDifficulty ?? ""}
              onChange={(e) =>
                setSelectedDifficulty(e.target.value || null)
              }
              className="relative -right-5 border border-gray-300 rounded px-10 py-1"
            >
              <option value="">(any)</option>
              <option 
              value="easy"
              className="bg-[#a7f3d0] text-black dark:bg-[#29AB87] dark:text-white"
              >easy
              </option>
              <option 
              value="medium"
              className="bg-[#fef9c3] text-black dark:bg-[#F4C430] dark:text-white"
              >medium</option>
              <option 
              value="hard"
              className="bg-[#fecaca] text-black dark:bg-[#F88379] dark:text-white"
              >hard</option>
            </select>
          </div>

          {/* Topics Row */}
          <div className="flex items-center gap-2">
            <label className="w-28 text-primary font-medium flex items-center gap-1">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="far"
                data-icon="tags"
                className="svg-inline--fa fa-tags w-9 h-5"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M345 39.1c-9.3-9.4-24.5-9.5-33.9-.2s-9.5 24.5-.2 33.9L438.6 202.1c33.9 34.3 33.9 89.4 0 123.7L326.7 439.1c-9.3 9.4-9.2 24.6.2 33.9s24.6 9.2 33.9-.2L472.8 359.6c52.4-53 52.4-138.2 0-191.2L345 39.1zM242.7 50.7c-12-12-28.3-18.7-45.3-18.7H48C21.5 32 0 53.5 0 80V229.5c0 17 6.7 33.3 18.7 45.3l168 168c25 25 65.5 25 90.5 0L410.7 309.3c25-25 25-65.5 0-90.5l-168-168zM48 80H197.5c4.2 0 8.3 1.7 11.3 4.7l168 168c6.2 6.2 6.2 16.4 0 22.6L243.3 408.8c-6.2 6.2-16.4 6.2-22.6 0l-168-168c-3-3-4.7-7.1-4.7-11.3V80zm96 64a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"
                />
              </svg>
              Topics
            </label>
            <select
              value={topicsCondition}
              onChange={(e) =>
                setTopicsCondition(e.target.value as "is" | "is not")
              }
              className="border border-gray-300 rounded px-2 py-1"
            >
              <option value="is">is</option>
              <option value="is not">is not</option>
            </select>
            {/* Topics Dropdown Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="border border-gray-300 rounded px-16 py-0 flex items-center gap-2 hover:bg-gray-200 transition">
                  {selectedTopics.length > 0
                    ? selectedTopics.join(", ")
                    : "(any)"}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="p-4 space-y-4 w-80">
                {/* Topics Search Input */}
                <div className="relative">
                  <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                  <input
                    type="text"
                    placeholder="search topics..."
                    value={topicsSearchTerm}
                    onChange={(e) => setTopicsSearchTerm(e.target.value)}
                    className="pl-8 pr-2 py-1 border border-gray-300 rounded w-full"
                  />
                </div>
                {/* Topic Chips */}
                <div className="flex flex-wrap gap-2 max-h-30 overflow-y-auto">
                  {visibleTopics.map((topic) => {
                    const isSelected = selectedTopics.includes(topic);
                    return (
                      <button
                        key={topic}
                        onClick={() => toggleTopic(topic)}
                        className={`px-3 py-1 rounded-full text-sm transition ${
                          isSelected
                            ? "bg-gray-500 text-white"
                            : "bg-gray-300 text-black hover:bg-gray-400"
                        }`}
                      >
                        {topic}
                      </button>
                    );
                  })}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>


          {/* Reset Button */}
          <div className="flex justify-center">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 border border-gray-300 bg-background text-primary px-4 py-2 rounded hover:bg-primary hover:text-white transition"
          >
            <span role="img" aria-label="Reset">↻</span>
            Reset
          </button>
          </div>
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
    </div>
  );
}
