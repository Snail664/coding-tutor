import { BotMessageSquare, User } from "lucide-react";
import Markdown from "react-markdown";

// LLMFeedback.tsx
export default function LLMFeedback({
  userQuestion,
  LLMResponse,
}: {
  userQuestion: string;
  LLMResponse: string;
}) {
  return (
    <>
      <div className="flex flex-row gap-2 items-center mb-5">
        <div className="bg-menuBackground p-3 rounded-md flex-1">
          {userQuestion}
        </div>
        <div className="bg-blue-300 h-10 w-10 justify-center items-center flex rounded-full">
          <User />
        </div>
      </div>

      <div className="flex flex-row gap-2 items-center">
        <div className="bg-menuBackground p-3 rounded-md flex-1">
          <Markdown>{LLMResponse}</Markdown>
        </div>
        <div className="bg-yellow-500 h-10 w-10 justify-center items-center flex rounded-full">
          <BotMessageSquare />
        </div>
      </div>
    </>
  );
}
