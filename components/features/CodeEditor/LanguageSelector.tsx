import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppDispatch, useAppSelector } from "@/store";
import { updateProgrammingLanguage } from "@/slices/CodeSlice";

export default function LanguageSelector() {
  const { question } = useAppSelector((state) => state.question);
  const { programmingLanguage, programmingLanguageList } = useAppSelector(
    (state) => state.code
  );
  const dispatch = useAppDispatch();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="default"
          className="w-[200px] justify-between bg-menuBackground text-primary hover:bg-primary hover:text-background"
        >
          <span className="flex items-center">
            <span className={`text-xl mr-2`}>{programmingLanguage.icon}</span>
            {programmingLanguage.name}
          </span>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-[200px] bg-background text-primary border-menuBackground"
      >
        {programmingLanguageList.map((lang) => (
          <DropdownMenuItem
            key={lang.name}
            onClick={() => {
              dispatch(
                updateProgrammingLanguage({
                  programmingLanguage: lang,
                  question,
                })
              );
            }}
            className={`cursor-pointer rounded-none focus:bg-menuBackground ${
              lang.name == programmingLanguage.name ? "bg-menuBackground" : ""
            }`}
          >
            <span className={`text-xl mr-2`}>{lang.icon}</span>
            {lang.name}
            <span className="text-xxs text-zinc-400 ml-1">
              {"(" + lang.version + ")"}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
