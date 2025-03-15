"use client";

import robotSpeakingGif from "@/assets/images/robot-speaking.gif";
import { useAppSelector } from "@/store";
import { XIcon } from "lucide-react";
import Image from "next/image";
import FeedbackDialog from "../ui/FeedbackDialog";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

export default function AssistantSpeaking({
  isHidden,
  setIsHidden,
}: {
  isHidden: boolean;
  setIsHidden: (isHidden: boolean) => void;
}) {
  const { assistantPopupText } = useAppSelector((state) => state.assistant);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  const content = (
    <div
      className={`fixed top-0 left-1/2 transform -translate-x-1/2 mt-4 z-[9999] ${
        isHidden ? "hidden" : ""
      }`}
      style={{ position: 'fixed', isolation: 'isolate' }}
    >
      <div className="flex flex-col bg-menuBackground p-4 rounded shadow-lg">
        <div className="flex justify-between">
          <div className="text-sm font-bold">Assistant</div>
          <XIcon onClick={() => setIsHidden(true)} className="cursor-pointer" />
        </div>
        <div className="flex items-center gap-2 justify-around">
          <Image
            src={robotSpeakingGif}
            alt="Robot Speaking"
            unoptimized
            height={100}
          />
          <div className="text-md">{assistantPopupText}</div>
        </div>
        <FeedbackDialog feedbackType="hint" />
      </div>
    </div>
  );

  if (!isMounted) return null;
  
  return createPortal(content, document.body);
}
