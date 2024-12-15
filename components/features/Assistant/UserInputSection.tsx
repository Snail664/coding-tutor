// UserInputSection.tsx
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SendHorizontal } from "lucide-react";
import RecordButton from "./RecordButton";
import HintButton from "./HintButton";
import Loading from "@/components/ui/loading";

interface UserInputSectionProps {
  userAudioTranscript: string;
  isRecording: boolean;
  setUserAudioTranscript: (value: string) => void;
  onRecordStart: () => void;
  onRecordStop: () => void;
  onSend: () => void;
  onHint: () => void;
  hintLoading: boolean;
  LLMFeedbackLoading: boolean;
}

export default function UserInputSection({
  userAudioTranscript,
  isRecording,
  setUserAudioTranscript,
  onRecordStart,
  onRecordStop,
  onSend,
  onHint,
  hintLoading,
  LLMFeedbackLoading,
}: UserInputSectionProps) {
  const isAnyLoading = hintLoading || LLMFeedbackLoading;

  return (
    <div className="flex-[1] flex-col flex items-center">
      <div className="w-10/12">
        <div className="flex items-center">
          <Input
            placeholder="Ask a question..."
            value={userAudioTranscript}
            disabled={isRecording || isAnyLoading}
            onChange={(e) => {
              setUserAudioTranscript(e.target.value);
            }}
          />
          <RecordButton
            isRecording={isRecording}
            startRecording={onRecordStart}
            stopRecording={onRecordStop}
            disabled={isAnyLoading}
          />
          <Button onClick={onSend} disabled={isAnyLoading}>
            {LLMFeedbackLoading ? (
              <Loading className="h-5 w-5" />
            ) : (
              <SendHorizontal />
            )}
          </Button>
        </div>

        <div className="flex items-center justify-center my-2">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="text-gray-500 font-medium"> OR </span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        <div className="flex items-center justify-between">
          <HintButton
            onClick={onHint}
            loading={hintLoading}
            disabled={isAnyLoading}
          />
          <div>unlimited hints left</div>
        </div>
      </div>
    </div>
  );
}
