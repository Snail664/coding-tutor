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

  // Get all unique topics from the question list
  const allTopics = Array.from(new Set(
    questionList.flatMap(q => q.tags?.map(tag => tag.name) || [])
  )).sort();

  // Filter the questions based on search term, selected difficulty, and selected topics
  const filteredQuestions = questionList.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = selectedDifficulty
      ? item.difficulty.toLowerCase() === selectedDifficulty.toLowerCase()
      : true;
    const matchesTopics = selectedTopics.length === 0 || 
      selectedTopics.every(topic => item.tags?.some(tag => tag.name === topic));
    return matchesSearch && matchesDifficulty && matchesTopics;
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
                className="w-[200px] p-2 bg-background text-primary border-menuBackground"
              >
                <div className="flex flex-wrap gap-2 max-h-[200px] overflow-y-auto">
                  {allTopics.map((topic) => (
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
                      className={`text-xs font-semibold px-2 py-1 rounded ${
                        selectedTopics.includes(topic)
                          ? "bg-gray-200 text-gray-800 dark:bg-gray-200 dark:text-gray-800"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-200 dark:hover:text-gray-800"
                      }`}
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Reset Filters */}
        {(selectedDifficulty !== null || selectedTopics.length > 0 || searchTerm) && (
          <div className="p-2 border-t border-menuBackground">
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedDifficulty(null);
                setSelectedTopics([]);
              }}
              className="text-xs text-primary hover:text-primary/80"
            >
              Reset Filters
            </button>
          </div>
        )}

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
