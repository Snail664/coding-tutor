"use client";
import { FileQuestion } from "lucide-react";
import CollapsiblePanel from "../../layout/CollapsiblePanel";
import QuestionSelector from "./QuestionSelector";
import Markdown from "react-markdown";
import rehypeRaw from 'rehype-raw';
import { useAppSelector } from "@/store";
import TopicTag from "./QuestionTopicTag";

export default function QuestionWindow() {
  const { question } = useAppSelector((state) => state.question);
  return (
    <CollapsiblePanel
      icon={<FileQuestion />}
      title="Question"
      headerActions={question ? <QuestionSelector /> : null}
    >
      <div className="p-5 markdown-container">
        {question?.tags && question.tags.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {question.tags.map((tag) => (
              <TopicTag key={tag.name} topic={tag.name} />
            ))}
          </div>
        )}
        <Markdown rehypePlugins={[rehypeRaw]}>{question?.content}</Markdown>
      </div>
    </CollapsiblePanel>
  );
}
