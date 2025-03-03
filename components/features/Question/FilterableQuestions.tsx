"use client";

import React, { useState } from "react";
import DifficultyTag from "./QuestionDifficultyTag";
import { QuestionDifficulty } from "@prisma/client";
import { Search as SearchIcon, Filter as FilterIcon, Eye as EyeIcon, EyeOff as EyeOffIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import TopicTag from "./QuestionTopicTag";
import { ChevronDown } from "lucide-react";

interface Question {
  name: string;
  difficulty: string;
  tags?: { name: string }[]; // Updated to match the Prisma query result
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
    "Breadth-First Search",
    "Bit Manipulation",
    "Two Pointers",
    "Prefix Sum",
    "Heap (Priority Queue)",
    "Binary Tree",
    "Stack",
    "Graph",
    "Design",
    "Enumeration",
    "Backtracking",
    "Union Find",
    "Linked List",
    "Number Theory",
    "Ordered Set",
    "Monotonic Stack",
    "Segment Tree",
    "Trie",
    "Combinatorics",
    "Bitmask",
    "Queue",
    "Divide and Conquer",
    "Recursion",
    "Memoization",
    "Binary Indexed Tree",
    "Geometry",
    "Binary Search Tree",
    "Hash Function",
    "Topological Sort",
    "Shortest Path",
    "Rolling Hash",
    "Data Stream",
    "Monotonic Queue",
    "Randomized",
    "Merge Sort",
    "Doubly-Linked List",
    "Counting Sort",
    "Iterator",
    "Concurrency",
    "Probability and Statistics",
    "Quickselect",
    "Suffix Array",
    "Bucket Sort",
    "Line Sweep",
    "Minimum Spanning Tree",
    "Shell",
    "Reservoir Sampling",
    "Strongly Connected Component",
    "Eulerian Circuit",
    "Radix Sort",
    "Rejection Sampling",
    "Biconnected Component"
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

  const [showTags, setShowTags] = useState(true);

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
    if (selectedTopics.length > 0 && question.tags) {
      if (topicsCondition === "is") {
        matchesTopics = selectedTopics.some((topic) => question.tags?.some((t) => t.name === topic));
      } else {
        matchesTopics = !selectedTopics.some((topic) => question.tags?.some((t) => t.name === topic));
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
      {/* Search Bar + Filter Button + Eye Button */}
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

        {/* Eye Button */}
        <button
          title="Toggle tags visibility"
          onClick={() => setShowTags(!showTags)}
          className="flex items-center justify-center w-10 h-10 bg-background text-primary border border-gray-300 rounded hover:bg-primary hover:text-white transition"
        >
          {showTags ? <EyeIcon className="h-4 w-4" /> : <EyeOffIcon className="h-4 w-4" />}
        </button>

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
            <div className="w-[84px]">
              <DropdownMenu>
                <DropdownMenuTrigger className="text-sd-foreground ring-offset-sd-background placeholder:text-sd-muted-foreground focus:ring-sd-ring flex items-center border bg-transparent text-sm disabled:cursor-not-allowed disabled:opacity-50 lc-dsw-md:justify-start border-sd-input h-[32px] w-[84px] justify-center rounded-lg p-0 px-3 focus:outline-none focus:ring-0 [&>svg]:hidden">
                  <span style={{ pointerEvents: "none" }}>
                    <div className="flex w-full items-center justify-between gap-2">
                      <div className="text-sd-foreground flex w-[42px] text-sm font-normal">
                        {difficultyCondition}
                      </div>
                      <div className="relative text-[12px] leading-[normal] p-[1px] before:block before:h-3 before:w-3 text-sd-muted-foreground">
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="far"
                          data-icon="chevron-down"
                          className="svg-inline--fa fa-chevron-down absolute left-1/2 top-1/2 h-[1em] -translate-x-1/2 -translate-y-1/2 align-[-0.125em]"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                        >
                          <path
                            fill="currentColor"
                            d="M239 401c9.4 9.4 24.6 9.4 33.9 0L465 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-175 175L81 175c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9L239 401z"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  </span>
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 opacity-50"
                    aria-hidden="true"
                  >
                    <path
                      d="M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.35753 11.9939 7.64245 11.9939 7.81819 11.8182L10.0682 9.56819Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white dark:bg-black border border-gray-200 dark:border-gray-700 shadow-md">
                  <DropdownMenuItem 
                    onClick={() => setDifficultyCondition("is")}
                    className="hover:bg-gray-100 dark:hover:bg-gray-800 hover:bg-opacity-90 cursor-pointer"
                  >
                    is
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => setDifficultyCondition("is not")}
                    className="hover:bg-gray-100 dark:hover:bg-gray-800 hover:bg-opacity-90 cursor-pointer"
                  >
                    is not
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="border-sd-input flex h-8 flex-1 cursor-pointer items-center justify-between rounded-xl border px-2 py-1.5 overflow-hidden bg-sd-accent text-sd-muted-foreground" aria-haspopup="menu" data-state="closed">
                  <div className="flex h-[18px] items-center text-sm leading-[18px] overflow-hidden text-ellipsis whitespace-nowrap max-w-[160px]">
                    {selectedDifficulty ? selectedDifficulty : "(any)"}
                  </div>
                  <div className="relative text-[12px] leading-[normal] p-[1px] before:block before:h-3 before:w-3 text-sd-muted-foreground flex-shrink-0 ml-1">
                    <svg 
                      aria-hidden="true" 
                      focusable="false" 
                      data-prefix="far" 
                      data-icon="chevron-down" 
                      className="svg-inline--fa fa-chevron-down absolute left-1/2 top-1/2 h-[1em] -translate-x-1/2 -translate-y-1/2 align-[-0.125em]" 
                      role="img" 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 512 512"
                    >
                      <path 
                        fill="currentColor" 
                        d="M239 401c9.4 9.4 24.6 9.4 33.9 0L465 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-175 175L81 175c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9L239 401z"
                      ></path>
                    </svg>
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="p-2 w-40 bg-white dark:bg-black border border-gray-200 dark:border-gray-700">
                <DropdownMenuItem 
                  onClick={() => setSelectedDifficulty(null)}
                  className="hover:bg-gray-100 dark:hover:bg-gray-800 hover:bg-opacity-90 cursor-pointer"
                >
                  (any)
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setSelectedDifficulty("easy")}
                  className="cursor-pointer bg-[#a7f3d0] text-black dark:bg-[#29AB87] dark:text-white hover:opacity-80"
                >
                  easy
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setSelectedDifficulty("medium")}
                  className="cursor-pointer bg-[#fef9c3] text-black dark:bg-[#F4C430] dark:text-white hover:opacity-80"
                >
                  medium
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setSelectedDifficulty("hard")}
                  className="cursor-pointer bg-[#fecaca] text-black dark:bg-[#F88379] dark:text-white hover:opacity-80"
                >
                  hard
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Topics Row */}
          <div className="flex items-center gap-2">
            <label className="w-24 text-primary font-medium flex items-center gap-1">
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
            <div className="w-[84px]">
              <DropdownMenu>
                <DropdownMenuTrigger className="text-sd-foreground ring-offset-sd-background placeholder:text-sd-muted-foreground focus:ring-sd-ring flex items-center border bg-transparent text-sm disabled:cursor-not-allowed disabled:opacity-50 lc-dsw-md:justify-start border-sd-input h-[32px] w-[84px] justify-center rounded-lg p-0 px-3 focus:outline-none focus:ring-0 [&>svg]:hidden">
                  <span style={{ pointerEvents: "none" }}>
                    <div className="flex w-full items-center justify-between gap-2">
                      <div className="text-sd-foreground flex w-[42px] text-sm font-normal">
                        {topicsCondition}
                      </div>
                      <div className="relative text-[12px] leading-[normal] p-[1px] before:block before:h-3 before:w-3 text-sd-muted-foreground">
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="far"
                          data-icon="chevron-down"
                          className="svg-inline--fa fa-chevron-down absolute left-1/2 top-1/2 h-[1em] -translate-x-1/2 -translate-y-1/2 align-[-0.125em]"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                        >
                          <path
                            fill="currentColor"
                            d="M239 401c9.4 9.4 24.6 9.4 33.9 0L465 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-175 175L81 175c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9L239 401z"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  </span>
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 opacity-50"
                    aria-hidden="true"
                  >
                    <path
                      d="M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.35753 11.9939 7.64245 11.9939 7.81819 11.8182L10.0682 9.56819Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white dark:bg-black border border-gray-200 dark:border-gray-700 shadow-md">
                  <DropdownMenuItem 
                    onClick={() => setTopicsCondition("is")}
                    className="hover:bg-gray-100 dark:hover:bg-gray-800 hover:bg-opacity-90 cursor-pointer"
                  >
                    is
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => setTopicsCondition("is not")}
                    className="hover:bg-gray-100 dark:hover:bg-gray-800 hover:bg-opacity-90 cursor-pointer"
                  >
                    is not
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            {/* Topics Dropdown Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="border-sd-input flex h-8 flex-1 cursor-pointer items-center justify-between rounded-xl border px-2 py-1.5 overflow-hidden bg-sd-accent text-sd-muted-foreground" aria-haspopup="menu" data-state="closed">
                  <div className="flex h-[18px] items-center text-sm leading-[18px] overflow-hidden text-ellipsis whitespace-nowrap max-w-[160px]">
                    {selectedTopics.length > 0
                      ? selectedTopics.length === 1
                        ? selectedTopics[0]
                        : `${selectedTopics[0]} +${selectedTopics.length - 1}`
                      : "(any)"}
                  </div>
                  <div className="relative text-[12px] leading-[normal] p-[1px] before:block before:h-3 before:w-3 text-sd-muted-foreground flex-shrink-0 ml-1">
                    <svg 
                      aria-hidden="true" 
                      focusable="false" 
                      data-prefix="far" 
                      data-icon="chevron-down" 
                      className="svg-inline--fa fa-chevron-down absolute left-1/2 top-1/2 h-[1em] -translate-x-1/2 -translate-y-1/2 align-[-0.125em]" 
                      role="img" 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 512 512"
                    >
                      <path 
                        fill="currentColor" 
                        d="M239 401c9.4 9.4 24.6 9.4 33.9 0L465 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-175 175L81 175c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9L239 401z"
                      ></path>
                    </svg>
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                side="bottom"
                align="start"
                sideOffset={4}
                alignOffset={0}
                className="p-4 space-y-4 w-80 bg-white dark:bg-black border border-gray-200 dark:border-gray-700 max-h-[300px] overflow-y-auto">
                {/* Topics Search Input */}
                <div className="relative">
                  <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                  <input
                    type="text"
                    placeholder="search topics..."
                    value={topicsSearchTerm}
                    onChange={(e) => setTopicsSearchTerm(e.target.value)}
                    className="pl-8 pr-2 py-1 border border-gray-300 dark:border-gray-700 rounded w-full bg-white dark:bg-black"
                  />
                </div>
                {/* Topic Chips */}
                <div className="flex flex-wrap gap-2 max-h-[300px] overflow-y-auto">
                  {visibleTopics.map((topic) => {
                    const isSelected = selectedTopics.includes(topic);
                    return (
                      <button
                        key={topic}
                        onClick={() => toggleTopic(topic)}
                        className={`px-3 py-1 rounded-full text-sm transition ${
                          isSelected
                            ? "bg-gray-500 text-white"
                            : "bg-gray-200 dark:bg-gray-700 text-black dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
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
                  className="p-4 flex flex-col"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-primary font-medium">{question.name}</span>
                    <DifficultyTag difficulty={question.difficulty as QuestionDifficulty} />
                  </div>
                  {question.tags && question.tags.length > 0 && showTags && (
                    <div className="mt-2 flex flex-wrap">
                      {question.tags.map((tag) => (
                        <TopicTag key={tag.name} topic={tag.name} />
                      ))}
                    </div>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
