// QuestionWindow.tsx

import { FileQuestion } from "lucide-react";
import CollapsiblePanel from "../../layout/CollapsiblePanel";
import QuestionSelector from "./QuestionSelector";
import Markdown from "react-markdown";
import { useAppSelector, useAppDispatch } from "@/store";
import { useEffect } from "react";
import { fetchQuestions } from "@/slices/QuestionSlice";

export default function QuestionWindow() {
  const dispatch = useAppDispatch();
  const { question, status, error } = useAppSelector((state) => state.question);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchQuestions());
    }
  }, [status, dispatch]);

  return (
    <CollapsiblePanel
      icon={<FileQuestion />}
      title="Question"
      headerActions={question ? <QuestionSelector /> : null}
    >
      <div className="p-5 markdown-container">
        {status === "loading" && <div>Loading...</div>}
        {status === "failed" && <div>Error: {error}</div>}
        {status === "succeeded" && question && (
          <Markdown>{question.content}</Markdown>
        )}
      </div>
    </CollapsiblePanel>
  );
}
