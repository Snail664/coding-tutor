import React, { useEffect, useRef, useState } from "react";
import { BotMessageSquare } from "lucide-react";
import CollapsiblePanel from "../../layout/CollapsiblePanel";
import UserInputSection from "./UserInputSection";
import LLMFeedback from "./LLMFeedback";
import {
  setUserAudioTranscript,
  getAssistantFeedbackThunk,
} from "@/slices/AssistantSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import { getHintThunk } from "@/slices/AssistantSlice";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useToast } from "@/hooks/use-toast";
import AssistantSpeaking from "./AssistantSpeaking";

export default function AssistantWindow() {
  const { user } = useUser();
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const {
    LLMResponse,
    userAudioTranscript,
    audioHintUrl,
    hintLoading,
    hintError,
    LLMFeedbackLoading,
    assistantPopupText,
  } = useAppSelector((state) => state.assistant);

  useEffect(() => {
    if (assistantPopupText) {
      setIsAssistantSpeakingHidden(false);
    }
  }, [assistantPopupText]);

  const [isRecording, setIsRecording] = useState(false);
  const [isAssistantSpeakingHidden, setIsAssistantSpeakingHidden] =
    useState(true);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  if (hintError) {
    toast({
      title: "Error",
      description: hintError,
    });
  }

  const handleSpeechResult = async (e: SpeechRecognitionEvent) => {
    let transcript = "";
    for (let i = 0; i < e.results.length; i++) {
      transcript += ` ${e.results[i][0].transcript}`;
    }
    handleSetUserAudioTranscript(transcript.trim());
  };

  const startRecording = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.onresult = handleSpeechResult;
    setIsRecording(true);
    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopRecording = () => {
    setIsRecording(false);
    recognitionRef.current?.stop();
    recognitionRef.current = null;
  };

  const handleSetUserAudioTranscript = (transcript: string) => {
    dispatch(setUserAudioTranscript(transcript));
  };

  const onHint = () => {
    if (!user)
      return toast({
        title: "Error",
        description: "Please login to get hint",
      });
    dispatch(getHintThunk());
  };

  const onSend = () => {
    if (!user)
      return toast({
        title: "Error",
        description: "Please login to send message",
      });
    dispatch(getAssistantFeedbackThunk());
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey && event.key === "h") {
        event.preventDefault();
        onHint();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [user, onHint]);

  return (
    <CollapsiblePanel icon={<BotMessageSquare />} title="LLM Assistant">
      {audioHintUrl && <audio className="hidden" src={audioHintUrl} autoPlay />}
      <AssistantSpeaking
        isHidden={isAssistantSpeakingHidden}
        setIsHidden={setIsAssistantSpeakingHidden}
        message={assistantPopupText}
      />

      <div className="flex flex-row w-full mt-5 px-3">
        <UserInputSection
          userAudioTranscript={userAudioTranscript}
          isRecording={isRecording}
          setUserAudioTranscript={handleSetUserAudioTranscript}
          onRecordStart={startRecording}
          onRecordStop={stopRecording}
          onSend={onSend}
          onHint={onHint}
          hintLoading={hintLoading}
          LLMFeedbackLoading={LLMFeedbackLoading}
        />
        <LLMFeedback LLMResponse={LLMResponse} />
      </div>
    </CollapsiblePanel>
  );
}
