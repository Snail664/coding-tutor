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
import { getTemplateCode, truncateText } from "@/lib/utils";
import QuestionDifficultyTag from "./QuestionDifficultyTag";
import { QUESTIONS } from "@/lib/constants";
import { useAppSelector, useAppDispatch } from "@/store";
import { updateQuestion } from "@/slices/QuestionSlice";
import { setSourceCode } from "@/slices/CodeSlice";

export default function QuestionSelector() {
  const {
    question: { question },
    code: { programmingLanguage },
  } = useAppSelector((state) => state);

  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const filteredQuestions = QUESTIONS.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="default"
          className="w-[300px] justify-between bg-menuBackground text-primary hover:bg-primary hover:text-background"
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
        {filteredQuestions.map((item) => (
          <DropdownMenuItem
            key={item.name}
            onClick={() => {
              dispatch(updateQuestion(item));
              dispatch(
                setSourceCode(getTemplateCode(programmingLanguage.name, item))
              );
              setSearchTerm("");
              setIsOpen(false);
            }}
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
