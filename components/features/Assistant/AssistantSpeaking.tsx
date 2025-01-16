import robotSpeakingGif from "@/assets/images/robot-speaking.gif";
import TypingEffect from "@/components/ui/typing-effect";
import { XIcon } from "lucide-react";
import Image from "next/image";
export default function AssistantSpeaking({
  isHidden,
  setIsHidden,
  message,
}: {
  isHidden: boolean;
  message: string;
  setIsHidden: (isHidden: boolean) => void;
}) {
  return (
    <div
      className={`fixed top-0 left-1/2 transform -translate-x-1/2 mt-4 z-50 ${
        isHidden ? "hidden" : ""
      }`}
    >
      <div className="flex flex-col bg-menuBackground p-4 rounded shadow-lg">
        <div className="flex justify-between">
          <div className="text-sm font-bold">Asssistant</div>
          <XIcon onClick={() => setIsHidden(true)} className="cursor-pointer" />
        </div>
        <div className="flex items-center gap-2 justify-around">
          <Image
            src={robotSpeakingGif}
            alt="Robot Speaking"
            unoptimized
            height={100}
          />
          <div className="text-lg">
            <TypingEffect text={message} speed={50} onComplete={() => {}} />
          </div>
        </div>
      </div>
    </div>
  );
}
