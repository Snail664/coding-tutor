"use client";
import React, { useEffect, useRef, useState } from "react";
import { BotMessageSquare } from "lucide-react";
import CollapsiblePanel from "../../layout/CollapsiblePanel";
import UserInputSection from "./UserInputSection";
import LLMFeedback from "./LLMFeedback";
import {
  setUserAudioTranscript,
  getAssistantFeedbackThunk,
  setUserAudioTranscriptInput,
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
    LLMResponseError,
    userAudioTranscript,
    userAudioTranscriptInput,
    hintLoading,
    hintError,
    LLMFeedbackLoading,
    assistantPopupText,
    proactiveFeedback,
    assistantAudioUrl,
  } = useAppSelector((state) => state.assistant);

  useEffect(() => {
    console.log("proactiveFeedback: ", proactiveFeedback);
  }, [proactiveFeedback]);

  useEffect(() => {
    if (assistantPopupText) {
      setIsAssistantSpeakingHidden(false);
    } else if (assistantPopupText == "") {
      setIsAssistantSpeakingHidden(true);
    }
  }, [assistantPopupText]);

  const [isRecording, setIsRecording] = useState(false);
  const [isAssistantSpeakingHidden, setIsAssistantSpeakingHidden] =
    useState(true);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    if (hintError) {
      toast({
        title: "Error",
        description: hintError,
      });
    }
    if (LLMResponseError) {
      toast({
        title: "Error",
        description: LLMResponseError,
      });
    }
  }, [toast, hintError, LLMResponseError]);

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

  const handleSetUserAudioTranscriptInput = (transcript: string) => {
    dispatch(setUserAudioTranscriptInput(transcript));
  };

  const onHint = () => {
    // if (!user)
    //   return toast({
    if (!user) {
      toast({
        title: "Error",
        description: "Please login to get hint",
      });
      return;
    }
    dispatch(getHintThunk());
  };

  const onSend = () => {
    // if (!user)
    //   return toast({
    if (!user) {
      toast({
        title: "Error",
        description: "Please login to send message",
      });
      return;
    }
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

  // console.log("assistantPopupText: ", assistantPopupText);
  return (
    <div style={{ height: isCollapsed ? "25px" : "300px" }}>
      <CollapsiblePanel
        icon={<BotMessageSquare />}
        title="LLM Assistant"
        onCollapsedChange={setIsCollapsed}
      >
        {assistantAudioUrl && (
          <audio className="hidden" src={assistantAudioUrl} autoPlay />
        )}
        <AssistantSpeaking
          isHidden={isAssistantSpeakingHidden}
          setIsHidden={setIsAssistantSpeakingHidden}
        />

        <div className="flex flex-row w-full mt-5 px-3">
          <UserInputSection
            userAudioTranscriptInput={userAudioTranscriptInput}
            isRecording={isRecording}
            setUserAudioTranscriptInput={handleSetUserAudioTranscriptInput}
            onRecordStart={startRecording}
            onRecordStop={stopRecording}
            onSend={onSend}
            onHint={onHint}
            hintLoading={hintLoading}
            LLMFeedbackLoading={LLMFeedbackLoading}
          />
          <LLMFeedback
            userQuestion={userAudioTranscript}
            LLMResponse={LLMResponse}
          />
        </div>
      </CollapsiblePanel>
    </div>
  );
}
