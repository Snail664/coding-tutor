"use client";
import { MessageCircleQuestion, SendHorizontal } from "lucide-react";
import Loading from "@/components/ui/loading";
import { Button } from "../ui/button";
import { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "../ui/textarea";
import RecordButton from "../Navbar/RecordButton";
import { useAppSelector, useAppDispatch } from "@/store";
import { useToast } from "@/hooks/use-toast";
import { getAssistantFeedbackThunk } from "@/slices/AssistantSlice";
import { setUserAudioTranscriptInput } from "@/slices/AssistantSlice";
import { useUser } from "@auth0/nextjs-auth0/client";
import LLMFeedback from "../Navbar/LLMFeedback";
export default function Chat() {
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
    <Dialog open={isChatOpen} onOpenChange={setIsChatOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="rounded-full">
          <MessageCircleQuestion className="text-yellow-500" />
          <p className="ml-2 text-background">Chat</p>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Chat with Codey</DialogTitle>
        </DialogHeader>
        <div className="h-80 overflow-y-auto">
          <LLMFeedback
            userQuestion={userAudioTranscript}
            LLMResponse={LLMResponse}
          />
        </div>
        <div className="border-gray-300 border rounded-md p-2">
          <Textarea
            value={userAudioTranscriptInput}
            disabled={LLMFeedbackLoading}
            onChange={(e) => {
              dispatch(setUserAudioTranscriptInput(e.target.value));
            }}
            className="shadow-none border-none resize-none focus-visible:ring-0"
            placeholder="ask a question..."
          />
          <div className="mt-2 flex justify-between">
            <RecordButton
              isRecording={isRecording}
              startRecording={startRecording}
              stopRecording={stopRecording}
              disabled={LLMFeedbackLoading}
            />
            <Button
              variant="ghost"
              onClick={onSend}
              disabled={LLMFeedbackLoading}
            >
              {LLMFeedbackLoading ? <Loading /> : <SendHorizontal />}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
