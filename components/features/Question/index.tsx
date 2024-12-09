// QuestionWindow.tsx

import { FileQuestion } from "lucide-react";
import CollapsiblePanel from "../../layout/CollapsiblePanel";
import QuestionSelector from "./QuestionSelector";
import Markdown from "react-markdown";
import { useAppSelector } from "@/store";

export default function QuestionWindow() {
  const { question } = useAppSelector((state) => state.question);
  return (
    <CollapsiblePanel
      icon={<FileQuestion />}
      title="Question"
      headerActions={<QuestionSelector />}
    >
      <div className="p-5 markdown-container">
        <Markdown>{question.content}</Markdown>
      </div>
    </CollapsiblePanel>
  );
}
