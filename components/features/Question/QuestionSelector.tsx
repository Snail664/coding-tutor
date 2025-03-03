import { useState } from "react";
import { ChevronDown, Search as SearchIcon } from "lucide-react";
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
import { useAppSelector } from "@/store";

export default function QuestionSelector() {
  const { question, questionList } = useAppSelector((state) => state.question);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  // Filter the questions based on search term and selected difficulty.
  const filteredQuestions = questionList.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = selectedDifficulty
      ? item.difficulty.toLowerCase() === selectedDifficulty.toLowerCase()
      : true;
    return matchesSearch && matchesDifficulty;
  });

  if (!question) {
    return null;
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="default"
          className="question-button w-[300px] justify-between bg-menuBackground text-primary hover:bg-primary hover:text-background"
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
        className="w-[300px] bg-background text-primary border-menuBackground"
      >
        <div className="p-2">
          {/* Difficulty Filter Buttons */}
          <div className="flex space-x-2 mb-2">
            <button
              onClick={() => setSelectedDifficulty(null)}
              className={`text-xs font-semibold px-2 py-1 rounded ${
                selectedDifficulty === null
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-primary hover:text-white"
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
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-800 hover:bg-primary hover:text-white"
                }`}
              >
                {difficulty}
              </button>
            ))}
        </div>
        {/* Search Input */}
        <div className="relative mb-2">
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


        {/* <div className="p-2">
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
        </div> */}
        {filteredQuestions.map((item) => (
          <DropdownMenuItem
            key={item.name}
            onClick={() =>
              (window.location.href = `/questions/${encodeURIComponent(
                item.name
              )}`)
            }
            className={`cursor-pointer rounded-none focus:bg-menuBackground ${
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
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
