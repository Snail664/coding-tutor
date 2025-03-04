"use client";

import { MessageCircleQuestion, SendHorizontal } from "lucide-react";
import Loading from "@/components/ui/loading";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import FeedbackDialog from "@/components/ui/FeedbackDialog";
import { Textarea } from "@/components/ui/textarea";
import RecordButton from "@/components/Navbar/RecordButton";
import { useAppSelector, useAppDispatch } from "@/store";
import { useToast } from "@/hooks/use-toast";
import { getAssistantFeedbackThunk } from "@/slices/AssistantSlice";
import { setUserAudioTranscriptInput } from "@/slices/AssistantSlice";
import { useUser } from "@auth0/nextjs-auth0/client";
import LLMFeedback from "@/components/Navbar/LLMFeedback";

export default function ChatBar() {
  const { user } = useUser();
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const {
    LLMResponse,
    LLMResponseError,
    userAudioTranscript,
    userAudioTranscriptInput,
    LLMFeedbackLoading,
  } = useAppSelector((state) => state.assistant);

  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    if (LLMResponseError) {
      toast({
        title: "Error",
        description: LLMResponseError,
      });
    }
  }, [toast, LLMResponseError]);

  const handleSpeechResult = async (e: SpeechRecognitionEvent) => {
    let transcript = "";
    for (let i = 0; i < e.results.length; i++) {
      transcript += ` ${e.results[i][0].transcript}`;
    }
    handleSetUserAudioTranscriptInput(transcript.trim());
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

  const handleSetUserAudioTranscriptInput = (transcript: string) => {
    dispatch(setUserAudioTranscriptInput(transcript));
  };

  const onSend = () => {
    if (!user) {
      toast({
        title: "Error",
        description: "Please login to send message",
      });
      return;
    }
    dispatch(getAssistantFeedbackThunk());
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isChatOpen ? (
        <Button
          variant="square"
          className="chat text-background hover:text-primary rounded-full w-12 h-12 shadow-lg"
          onClick={() => setIsChatOpen(true)}
        >
          <MessageCircleQuestion className="text-yellow-500 w-6 h-6" />
        </Button>
      ) : (
        <div className="bg-background rounded-lg shadow-xl w-[400px] max-h-[600px] flex flex-col">
          <div className="p-4 border-b flex justify-between items-center">
            <h3 className="font-semibold">Chat with Codey</h3>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => setIsChatOpen(false)}
            >
              ✕
            </Button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 min-h-[300px]">
            <LLMFeedback
              userQuestion={userAudioTranscript}
              LLMResponse={LLMResponse}
            />
          </div>

          <div className="border-t p-4">
            <div className="border rounded-md p-2">
              <Textarea
                onEnter={onSend}
                value={userAudioTranscriptInput}
                disabled={LLMFeedbackLoading}
                onChange={(e) => {
                  dispatch(setUserAudioTranscriptInput(e.target.value));
                }}
                className="shadow-none border-none resize-none focus-visible:ring-0"
                placeholder="Ask a question..."
              />
              <div className="mt-2 flex justify-between">
                <RecordButton
                  isRecording={isRecording}
                  startRecording={startRecording}
                  stopRecording={stopRecording}
                  disabled={LLMFeedbackLoading}
                />
                {!LLMFeedbackLoading && LLMResponse ? (
                  <FeedbackDialog feedbackType="chat" />
                ) : null}
                <Button
                  variant="ghost"
                  onClick={onSend}
                  disabled={LLMFeedbackLoading}
                >
                  {LLMFeedbackLoading ? <Loading /> : <SendHorizontal />}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 