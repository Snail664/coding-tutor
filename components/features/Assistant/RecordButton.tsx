import { Square } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Mic } from "lucide-react";

export default function RecordButton({
  isRecording,
  startRecording,
  stopRecording,
}: {
  isRecording: boolean;
  startRecording: () => void;
  stopRecording: () => void;
}) {
  const handleClick = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <Button variant="ghost" onClick={handleClick}>
      {!isRecording && <Mic />}
      {isRecording && <Square className="bg-red-600 text-red-600 rounded-md" />}
    </Button>
  );
}
