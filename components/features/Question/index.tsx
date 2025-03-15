"use client";
import { FileQuestion } from "lucide-react";
import CollapsiblePanel from "../../layout/CollapsiblePanel";
import QuestionSelector from "./QuestionSelector";
import Markdown from "react-markdown";
import rehypeRaw from 'rehype-raw';
import { useAppSelector } from "@/store";
import TopicTag from "./QuestionTopicTag";
import type { TableHTMLAttributes } from 'react';

export default function QuestionWindow() {
  const { question } = useAppSelector((state) => state.question);

  // Format table markdown by ensuring proper line breaks
  const formatContent = (content: string | undefined) => {
    if (!content) return '';
    
    // Fix table formatting by ensuring proper line breaks and spacing
    return content.replace(/\| *([^|\n]*) *\|/g, (match, cell) => {
      // If this is a separator row (contains only dashes and pipes)
      if (/^[-|]+$/.test(match)) {
        return match + '\n';
      }
      // For data rows, ensure proper spacing
      return `| ${cell.trim()} |\n`;
    }).trim();
  };

  const components = {
    table: (props: TableHTMLAttributes<HTMLTableElement>) => (
      <div className="overflow-x-auto w-full">
        <table {...props} className="min-w-full table-auto" />
      </div>
    )
  };

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
        <Markdown rehypePlugins={[rehypeRaw]} components={components}>
          {formatContent(question?.content)}
        </Markdown>
      </div>
    </CollapsiblePanel>
  );
}
