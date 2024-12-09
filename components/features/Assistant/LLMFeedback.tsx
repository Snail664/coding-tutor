// LLMFeedback.tsx
export default function LLMFeedback({ LLMResponse }: { LLMResponse: string }) {
  return (
    <div className="flex-[2]">
      <p className="font-bold text-md">LLM Assistant Feedback:</p>
      <div className="flex-1 bg-menuBackground p-3 rounded-md min-h-[100px] flex flex-col">
        <div className="flex-1 text-sm overflow-auto p-1">{LLMResponse}</div>
      </div>
    </div>
  );
}
