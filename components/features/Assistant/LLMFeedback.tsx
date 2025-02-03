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
    <div className="flex-[2]">
      <p className="font-bold text-md">User Question:</p>
      <div className="flex-1 bg-menuBackground p-3 rounded-md mb-5 flex flex-col">
        <div className="flex-1 text-sm overflow-auto p-1">{userQuestion}</div>
      </div>
      <p className="font-bold text-md">LLM Assistant Feedback:</p>
      <div className="flex-1 bg-menuBackground p-3 rounded-md min-h-[100px] flex flex-col">
        <div className="flex-1 text-sm overflow-auto p-1">
          <Markdown>{LLMResponse}</Markdown>
        </div>
      </div>
    </div>
  );
}
