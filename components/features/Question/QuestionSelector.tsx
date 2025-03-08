import { useState } from "react";
import { ChevronDown, Search as SearchIcon, Filter as FilterIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { truncateText } from "@/lib/utils";
import QuestionDifficultyTag from "./QuestionDifficultyTag";
import TopicTag from "./QuestionTopicTag";
import { useAppSelector } from "@/store";

export default function QuestionSelector() {
  const { question, questionList } = useAppSelector((state) => state.question);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isTopicsOpen, setIsTopicsOpen] = useState(false);
  const [topicsSearchTerm, setTopicsSearchTerm] = useState("");

  // Get all unique topics from the question list
  const allTopics = Array.from(new Set(
    questionList.flatMap(q => q.tags?.map(tag => tag.name) || [])
  )).sort();

  // Filter topics based on search term
  const filteredTopics = allTopics.filter(topic => 
    topic.toLowerCase().includes(topicsSearchTerm.toLowerCase())
  );

  // Filter the questions based on search term, selected difficulty, and selected topics
  const filteredQuestions = questionList.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = selectedDifficulty
      ? item.difficulty.toLowerCase() === selectedDifficulty.toLowerCase()
      : true;
    const matchesTopics = selectedTopics.length === 0 || 
      selectedTopics.every(topic => item.tags?.some(tag => tag.name === topic));
    return matchesSearch && matchesDifficulty && matchesTopics;
  }).sort((a, b) => {
    // First sort by difficulty (easy -> medium -> hard)
    const difficultyOrder = { easy: 1, medium: 2, hard: 3 };
    const diffCompare = difficultyOrder[a.difficulty.toLowerCase() as keyof typeof difficultyOrder] - 
                       difficultyOrder[b.difficulty.toLowerCase() as keyof typeof difficultyOrder];
    
    // If same difficulty, sort alphabetically by name
    if (diffCompare === 0) {
      return a.name.localeCompare(b.name);
    }
    return diffCompare;
  });

  if (!question) {
    return null;
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="default"
          className="question-button w-[400px] justify-between bg-menuBackground text-primary hover:bg-primary hover:text-background"
        >
          <span className="flex items-center overflow-hidden">
            <QuestionDifficultyTag difficulty={question.difficulty} />
            <span title={question.name} className="ml-2 truncate">
              {truncateText(question.name, 80)}
            </span>
          </span>
          <ChevronDown className="h-4 w-4 opacity-50 flex-shrink-0" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-[400px] bg-background text-primary border-menuBackground"
      >
        {/* Search Input */}
        <div className="p-2">
          <div className="relative">
            <SearchIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <Input
              type="text"
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8"
            />
          </div>
        </div>

        {/* Filters Row */}
        <div className="p-2 border-t border-menuBackground">
          <div className="flex items-center gap-3">
            {/* Difficulty Filters */}
            <div className="flex gap-1 flex-1">
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
              {["easy", "medium", "hard"].map((difficulty) => (
                <button
                  key={difficulty}
                  onClick={() => setSelectedDifficulty(difficulty)}
                  className={`text-xs font-semibold px-2 py-1 rounded ${
                    selectedDifficulty === difficulty
                      ? "bg-gray-200 text-gray-800 dark:bg-gray-200 dark:text-gray-800"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-200 dark:hover:text-gray-800"
                  }`}
                >
                  {difficulty}
                </button>
              ))}
            </div>

            {/* Topics Filter Button */}
            <DropdownMenu open={isTopicsOpen} onOpenChange={setIsTopicsOpen}>
              <DropdownMenuTrigger asChild>
                <button
                  className={`flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded ${
                    selectedTopics.length > 0
                      ? "bg-gray-200 text-gray-800 dark:bg-gray-200 dark:text-gray-800"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-200 dark:hover:text-gray-800"
                  }`}
                >
                  <FilterIcon className="h-3 w-3" />
                  {selectedTopics.length > 0 ? `${selectedTopics.length} topics` : "Topics"}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-[350px] p-2 bg-background text-primary border-menuBackground"
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
                
                <div className="max-h-[300px] overflow-y-auto">
                  <div className="grid grid-cols-2 gap-1">
                    {filteredTopics.map((topic) => (
                      <button
                        key={topic}
                        onClick={(e) => {
                          e.preventDefault();
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
                    Reset Topics
                  </button>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Questions List */}
        <div className="border-t border-menuBackground max-h-[300px] overflow-y-auto">
          {filteredQuestions.map((item) => (
            <DropdownMenuItem
              key={item.name}
              onClick={() =>
                (window.location.href = `/questions/${encodeURIComponent(
                  item.name
                )}`)
              }
              className={`cursor-pointer rounded-none hover:bg-gray-200 dark:hover:bg-gray-200 hover:text-black dark:hover:text-black ${
                item.name === question.name ? "bg-menuBackground" : ""
              }`}
            >
              <span className="flex items-center w-full">
                <QuestionDifficultyTag difficulty={item.difficulty} />
                <span title={item.name} className="ml-2 truncate">
                  {truncateText(item.name, 80)}
                </span>
              </span>
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
