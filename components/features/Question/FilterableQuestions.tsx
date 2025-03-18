"use client";

import React, { useState } from "react";
import DifficultyTag from "./QuestionDifficultyTag";
import { QuestionDifficulty } from "@prisma/client";
import {
  Search as SearchIcon,
  Filter as FilterIcon,
  Eye as EyeIcon,
  EyeOff as EyeOffIcon,
  ChevronDown,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";
import TopicTag from "./QuestionTopicTag";
import { Input } from "@/components/ui/input";

interface Question {
  name: string;
  difficulty: string;
  tags?: { name: string }[];
}

interface Props {
  questions: Question[];
}

export default function FilterableQuestions({ questions }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(
    null
  );
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [topicsCondition, setTopicsCondition] = useState<"is" | "is not">("is");
  const [showTags, setShowTags] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isTopicsOpen, setIsTopicsOpen] = useState(false);
  const [topicsSearchTerm, setTopicsSearchTerm] = useState("");

  // Get all unique topics
  const allTopics = Array.from(
    new Set(questions.flatMap((q) => q.tags?.map((tag) => tag.name) || []))
  ).sort();

  // Filter topics based on search term
  const filteredTopics = allTopics.filter((topic) =>
    topic.toLowerCase().includes(topicsSearchTerm.toLowerCase())
  );

  // Filter questions based on search term, difficulty, and topics
  const filteredQuestions = questions
    .filter((question) => {
      const matchesSearch = question.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesDifficulty = selectedDifficulty
        ? question.difficulty.toLowerCase() === selectedDifficulty.toLowerCase()
        : true;

      // Topics filter logic
      let matchesTopics = true;
      if (selectedTopics.length > 0 && question.tags) {
        if (topicsCondition === "is") {
          // At least one of the selected topics must match
          matchesTopics = selectedTopics.some((topic) =>
            question.tags?.some((tag) => tag.name === topic)
          );
        } else {
          // None of the selected topics should match
          matchesTopics = !selectedTopics.some((topic) =>
            question.tags?.some((tag) => tag.name === topic)
          );
        }
      }

      return matchesSearch && matchesDifficulty && matchesTopics;
    })
    .sort((a, b) => {
      // First sort by difficulty (easy -> medium -> hard)
      const difficultyOrder = { easy: 1, medium: 2, hard: 3 };
      const diffCompare =
        difficultyOrder[
          a.difficulty.toLowerCase() as keyof typeof difficultyOrder
        ] -
        difficultyOrder[
          b.difficulty.toLowerCase() as keyof typeof difficultyOrder
        ];

      // If same difficulty, sort alphabetically by name
      if (diffCompare === 0) {
        return a.name.localeCompare(b.name);
      }
      return diffCompare;
    });

  const handleReset = () => {
    setSearchTerm("");
    setSelectedDifficulty(null);
    setSelectedTopics([]);
    setTopicsCondition("is");
    setTopicsSearchTerm("");
  };

  // Check if any filters are active
  const hasActiveFilters =
    selectedDifficulty !== null || selectedTopics.length > 0;

  return (
    <div className="w-full max-w-md px-5">
      {/* Search Bar + Filter Button */}
      <div className="flex items-center gap-2 mb-4">
        <div className="relative w-full">
          <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <Input
            type="text"
            placeholder="Search questions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8"
          />
        </div>

        <div className="flex-shrink-0 flex items-center gap-2">
          <button
            title="Toggle tags visibility"
            onClick={() => setShowTags(!showTags)}
            className="flex items-center justify-center w-10 h-10 bg-background text-primary border border-gray-300 rounded hover:bg-primary hover:text-white transition flex-shrink-0"
          >
            {showTags ? <EyeIcon className="h-4 w-4" /> : <EyeOffIcon className="h-4 w-4" />}
          </button>

          <DropdownMenu open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <DropdownMenuTrigger asChild>
              <button
                title="Filter"
                className={`flex items-center justify-center w-10 h-10 border rounded transition flex-shrink-0 ${
                  hasActiveFilters 
                    ? "bg-primary text-white hover:bg-primary/90" 
                    : "bg-background text-primary border-gray-300 hover:bg-primary hover:text-white"
                }`}
              >
                <FilterIcon className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuPortal>
              <DropdownMenuContent 
                align="start" 
                side="right"
                sideOffset={5}
                className="w-[300px] p-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
              >
                {/* Difficulty Filter */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-1 text-sm font-medium">
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="far"
                      data-icon="gauge-max"
                      className="w-4 h-4"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="currentColor"
                        d="M256 464a208 208 0 1 0 0-416 208 208 0 1 0 0 416zM256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zm32 112a32 32 0 1 1 -64 0 32 32 0 1 1 64 0zM256 408c-30.9 0-56-25.1-56-56s25.1-56 56-56c10.3 0 19.9 2.8 28.2 7.6l110.2-75.4c10.9-7.5 25.9-4.7 33.4 6.3s4.7 25.9-6.3 33.4L311.3 343.2c.4 2.9 .7 5.8 .7 8.8c0 30.9-25.1 56-56 56zM384 160a32 32 0 1 1 -64 0 32 32 0 1 1 64 0zM112 224a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm80-64a32 32 0 1 1 -64 0 32 32 0 1 1 64 0z"
                      />
                    </svg>
                    <span>Difficulty</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    <button
                      onClick={() => setSelectedDifficulty(null)}
                      className={`text-xs font-semibold px-2 py-1 rounded ${
                        selectedDifficulty === null
                          ? "bg-gray-200 text-gray-800 dark:bg-gray-200 dark:text-gray-800"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-200 dark:hover:text-gray-800"
                      }`}
                    >
                      All
                    </button>
                    <button
                      onClick={() => setSelectedDifficulty("easy")}
                      className={`text-xs font-semibold px-2 py-1 rounded ${
                        selectedDifficulty === "easy"
                          ? "bg-gray-200 text-green-600 dark:bg-gray-200 dark:text-green-600"
                          : "bg-gray-100 text-green-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-green-400 dark:hover:bg-gray-200 dark:hover:text-green-600"
                      }`}
                    >
                      Easy
                    </button>
                    <button
                      onClick={() => setSelectedDifficulty("medium")}
                      className={`text-xs font-semibold px-2 py-1 rounded ${
                        selectedDifficulty === "medium"
                          ? "bg-gray-200 text-yellow-600 dark:bg-gray-200 dark:text-yellow-600"
                          : "bg-gray-100 text-yellow-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-yellow-400 dark:hover:bg-gray-200 dark:hover:text-yellow-600"
                      }`}
                    >
                      Medium
                    </button>
                    <button
                      onClick={() => setSelectedDifficulty("hard")}
                      className={`text-xs font-semibold px-2 py-1 rounded ${
                        selectedDifficulty === "hard"
                          ? "bg-gray-200 text-red-600 dark:bg-gray-200 dark:text-red-600"
                          : "bg-gray-100 text-red-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-red-400 dark:hover:bg-gray-200 dark:hover:text-red-600"
                      }`}
                    >
                      Hard
                    </button>
                  </div>
                </div>

                <DropdownMenuSeparator />

                {/* Topics Filter - LeetCode Style */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-1 text-sm font-medium">
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="far"
                      data-icon="tags"
                      className="w-4 h-4"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="currentColor"
                        d="M345 39.1c-9.3-9.4-24.5-9.5-33.9-.2s-9.5 24.5-.2 33.9L438.6 202.1c33.9 34.3 33.9 89.4 0 123.7L326.7 439.1c-9.3 9.4-9.2 24.6.2 33.9s24.6 9.2 33.9-.2L472.8 359.6c52.4-53 52.4-138.2 0-191.2L345 39.1zM242.7 50.7c-12-12-28.3-18.7-45.3-18.7H48C21.5 32 0 53.5 0 80V229.5c0 17 6.7 33.3 18.7 45.3l168 168c25 25 65.5 25 90.5 0L410.7 309.3c25-25 25-65.5 0-90.5l-168-168c-3-3-4.7-7.1-4.7-11.3V80zm96 64a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"
                      />
                    </svg>
                    <span>Topics</span>
                  </div>
                  
                  {/* LeetCode-style condition and topics selectors */}
                  <div className="flex gap-2 mb-2">
                    {/* Condition Dropdown */}
                    <DropdownMenu>
                      <DropdownMenuTrigger className="flex items-center justify-between px-3 py-1.5 text-xs border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 w-[80px]">
                        <span>{topicsCondition}</span>
                        <ChevronDown className="h-3 w-3 opacity-50 ml-1" />
                      </DropdownMenuTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuContent 
                          align="start" 
                          className="w-[80px] p-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
                        >
                          <DropdownMenuItem 
                            onClick={() => setTopicsCondition("is")}
                            className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 px-2 py-1 text-xs"
                          >
                            is
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => setTopicsCondition("is not")}
                            className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 px-2 py-1 text-xs"
                          >
                            is not
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenuPortal>
                    </DropdownMenu>

                    {/* Topics Dropdown */}
                    <DropdownMenu open={isTopicsOpen} onOpenChange={setIsTopicsOpen}>
                      <DropdownMenuTrigger className="flex items-center justify-between px-3 py-1.5 text-xs border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 flex-1">
                        <span className="truncate max-w-[150px]">
                          {selectedTopics.length > 0
                            ? selectedTopics.length === 1
                              ? selectedTopics[0]
                              : `${selectedTopics[0]} +${selectedTopics.length - 1}`
                            : "(any)"}
                        </span>
                        <ChevronDown className="h-3 w-3 opacity-50 ml-1 flex-shrink-0" />
                      </DropdownMenuTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuContent 
                          align="start" 
                          side="bottom"
                          sideOffset={5}
                          className="w-[350px] p-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
                        >
                          {/* Search input for topics */}
                          <div className="mb-2 relative">
                            <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-zinc-400" />
                            <Input
                              type="text"
                              placeholder="Search topics..."
                              value={topicsSearchTerm}
                              onChange={(e) => setTopicsSearchTerm(e.target.value)}
                              className="w-full pl-7 py-1 h-7 text-xs"
                            />
                          </div>
                          
                          <div className="max-h-[200px] overflow-y-auto">
                            <div className="grid grid-cols-2 gap-1">
                              {filteredTopics.map((topic) => (
                                <button
                                  key={topic}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedTopics(prev =>
                                      prev.includes(topic)
                                        ? prev.filter(t => t !== topic)
                                        : [...prev, topic]
                                    );
                                  }}
                                  className={`text-xs px-2 py-1 rounded flex items-center gap-1 ${
                                    selectedTopics.includes(topic)
                                      ? "bg-gray-200 text-gray-800 dark:bg-gray-200 dark:text-gray-800"
                                      : "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-200 dark:hover:text-gray-800"
                                  }`}
                                >
                                  {selectedTopics.includes(topic) && (
                                    <svg width="10" height="10" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                                    </svg>
                                  )}
                                  <span className="truncate">{topic}</span>
                                </button>
                              ))}
                            </div>
                          </div>
                          
                          {/* Reset button for topics only */}
                          {selectedTopics.length > 0 && (
                            <button
                              onClick={() => setSelectedTopics([])}
                              className="w-full flex items-center justify-center gap-1 py-1 px-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded mt-2 text-xs transition-colors"
                            >
                              <svg 
                                aria-hidden="true" 
                                focusable="false" 
                                data-prefix="far" 
                                data-icon="arrow-rotate-left" 
                                className="h-3 w-3" 
                                role="img" 
                                xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 512 512"
                              >
                                <path 
                                  fill="currentColor" 
                                  d="M40 224c-13.3 0-24-10.7-24-24V56c0-13.3 10.7-24 24-24s24 10.7 24 24v80.1l20-23.5C125 63.4 186.9 32 256 32c123.7 0 224 100.3 224 224s-100.3 224-224 224c-50.4 0-97-16.7-134.4-44.8c-10.6-8-12.7-23-4.8-33.6s23-12.7 33.6-4.8C179.8 418.9 216.3 432 256 432c97.2 0 176-78.8 176-176s-78.8-176-176-176c-54.3 0-102.9 24.6-135.2 63.4l-.1 .2 0 0L93.1 176H184c13.3 0 24 10.7 24 24s-10.7 24-24 24H40z"
                                ></path>
                              </svg>
                              Reset
                            </button>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenuPortal>
                    </DropdownMenu>
                  </div>
                </div>

                {/* Reset All Filters Button */}
                {hasActiveFilters && (
                  <button
                    onClick={handleReset}
                    className="w-full flex items-center justify-center gap-1 py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded mt-2 text-sm transition-colors"
                  >
                    <svg 
                      aria-hidden="true" 
                      focusable="false" 
                      data-prefix="far" 
                      data-icon="arrow-rotate-left" 
                      className="h-4 w-4" 
                      role="img" 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 512 512"
                    >
                      <path 
                        fill="currentColor" 
                        d="M40 224c-13.3 0-24-10.7-24-24V56c0-13.3 10.7-24 24-24s24 10.7 24 24v80.1l20-23.5C125 63.4 186.9 32 256 32c123.7 0 224 100.3 224 224s-100.3 224-224 224c-50.4 0-97-16.7-134.4-44.8c-10.6-8-12.7-23-4.8-33.6s23-12.7 33.6-4.8C179.8 418.9 216.3 432 256 432c97.2 0 176-78.8 176-176s-78.8-176-176-176c-54.3 0-102.9 24.6-135.2 63.4l-.1 .2 0 0L93.1 176H184c13.3 0 24 10.7 24 24s-10.7 24-24 24H40z"
                      ></path>
                    </svg>
                    Reset
                  </button>
                )}
              </DropdownMenuContent>
            </DropdownMenuPortal>
          </DropdownMenu>
        </div>
      </div>

      {/* Questions List */}
      <div className="bg-menuBackground w-full max-w-md rounded-xl shadow-lg overflow-hidden">
        <div className="h-96 overflow-y-auto">
          {filteredQuestions.length > 0 ? (
            <ul className="divide-y divide-gray-300">
              {filteredQuestions.map((question) => (
                <li
                  key={question.name}
                  className="hover:bg-background transition"
                >
                  <a
                    href={`/questions/${question.name}`}
                    className="p-4 flex flex-col"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-primary font-medium">
                        {question.name}
                      </span>
                      <DifficultyTag
                        difficulty={question.difficulty as QuestionDifficulty}
                      />
                    </div>
                    {question.tags && question.tags.length > 0 && showTags && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {question.tags.map((tag) => (
                          <TopicTag key={tag.name} topic={tag.name} />
                        ))}
                      </div>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-4 text-gray-500">
              <p>No questions match your filters</p>
              <button
                onClick={handleReset}
                className="mt-2 flex items-center gap-1 text-sm text-primary hover:underline"
              >
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="far"
                  data-icon="arrow-rotate-left"
                  className="h-3 w-3"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M40 224c-13.3 0-24-10.7-24-24V56c0-13.3 10.7-24 24-24s24 10.7 24 24v80.1l20-23.5C125 63.4 186.9 32 256 32c123.7 0 224 100.3 224 224s-100.3 224-224 224c-50.4 0-97-16.7-134.4-44.8c-10.6-8-12.7-23-4.8-33.6s23-12.7 33.6-4.8C179.8 418.9 216.3 432 256 432c97.2 0 176-78.8 176-176s-78.8-176-176-176c-54.3 0-102.9 24.6-135.2 63.4l-.1 .2 0 0L93.1 176H184c13.3 0 24 10.7 24 24s-10.7 24-24 24H40z"
                  ></path>
                </svg>
                Reset filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
