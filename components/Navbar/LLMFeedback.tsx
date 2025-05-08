import { BotMessageSquare, User } from "lucide-react";

// LLMFeedback.tsx
interface LLMFeedbackProps {
  userQuestion?: string;
  LLMResponse?: string;
}

export default function LLMFeedback({
  userQuestion,
  LLMResponse,
}: LLMFeedbackProps) {
  const processedResponse = LLMResponse?.replace(
    /\[([^\]]+)\]\(QUESTION_LINK:([^)]+)\)/g,
    (_, text, questionName) => `[${text}](/questions/${questionName})`
  );

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
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 whitespace-pre-wrap">
            {processedResponse}
          </div>
        </div>
      )}
    </div>
  );
}
