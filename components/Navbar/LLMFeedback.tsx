import { BotMessageSquare, User } from "lucide-react";
import Markdown from "react-markdown";
import rehypeRaw from 'rehype-raw';
import Link from "next/link";
import { useRouter } from "next/navigation";

// LLMFeedback.tsx
interface LLMFeedbackProps {
  userQuestion?: string;
  LLMResponse?: string;
}

export default function LLMFeedback({ userQuestion, LLMResponse }: LLMFeedbackProps) {
  const router = useRouter();

  const processedResponse = LLMResponse?.replace(
    /\[([^\]]+)\]\(QUESTION_LINK:([^)]+)\)/g, 
    (_, text, questionName) => `[${text}](/questions/${questionName})`
  );

  const components = {
    a: ({ node, ...props }: any) => {
      const href = props.href;
      return <a {...props} className="text-primary hover:text-primary/80 underline" />;
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {userQuestion && (
        <div className="flex gap-2">
          <User className="w-5 h-5 mt-1 text-primary" />
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
            {userQuestion}
          </div>
        </div>
      )}
      {processedResponse && (
        <div className="flex gap-2">
          <BotMessageSquare className="w-5 h-5 mt-1 text-primary" />
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
            <Markdown rehypePlugins={[rehypeRaw]} components={components}>{processedResponse}</Markdown>
          </div>
        </div>
      )}
    </div>
  );
}
