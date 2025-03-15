'use client';

import { useState, useRef, useEffect } from 'react';
import { Search, MessageCircleQuestion } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useAppDispatch } from '@/store';
import { setUserAudioTranscript, setUserAudioTranscriptInput } from '@/slices/AssistantSlice';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import Loading from '@/components/ui/loading';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useToast } from '@/hooks/use-toast';
import { getGeneralAssistantFeedbackThunk } from '@/slices/AssistantSlice';
import { useAppSelector } from '@/store';
import LLMFeedback from '@/components/Navbar/LLMFeedback';
import FeedbackDialog from '@/components/ui/FeedbackDialog';
import RecordButton from '@/components/Navbar/RecordButton';

export default function CodeySearch() {
  const [query, setQuery] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [initialQuestion, setInitialQuestion] = useState('');
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const dispatch = useAppDispatch();
  const { user } = useUser();
  const { toast } = useToast();
  const {
    LLMResponse,
    LLMResponseError,
    userAudioTranscript,
    userAudioTranscriptInput,
    LLMFeedbackLoading,
  } = useAppSelector((state) => state.assistant);

  // Send initial question when chat opens
  useEffect(() => {
    if (isChatOpen && initialQuestion) {
      dispatch(setUserAudioTranscriptInput(initialQuestion));
      dispatch(setUserAudioTranscript(initialQuestion));
      dispatch(getGeneralAssistantFeedbackThunk());
      setInitialQuestion('');
    }
  }, [isChatOpen, initialQuestion, dispatch]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({
        title: "Error",
        description: "Please login to chat with Codey",
      });
      return;
    }
    setInitialQuestion(query);
    setIsChatOpen(true);
  };

  const handleSpeechResult = async (e: SpeechRecognitionEvent) => {
    let transcript = "";
    for (let i = 0; i < e.results.length; i++) {
      transcript += ` ${e.results[i][0].transcript}`;
    }
    const trimmedTranscript = transcript.trim();
    dispatch(setUserAudioTranscriptInput(trimmedTranscript));
    dispatch(setUserAudioTranscript(trimmedTranscript));
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

  const onSend = () => {
    if (!user) {
      toast({
        title: "Error",
        description: "Please login to send message",
      });
      return;
    }
    dispatch(setUserAudioTranscript(userAudioTranscriptInput));
    dispatch(getGeneralAssistantFeedbackThunk());
  };

  return (
    <>
      <div className="w-full max-w-3xl mx-auto relative">
        <form onSubmit={handleSearch} className="relative">
          <Input
            type="text"
            placeholder="What can Codey help you with?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full py-6 pl-12 pr-4 text-lg rounded-2xl shadow-lg border-2 border-primary/20 focus:border-primary/50 transition-all dark:bg-gray-900"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <button
            type="submit"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-primary dark:bg-gray-800 text-white px-4 py-2 rounded-xl hover:bg-primary/90 dark:hover:bg-gray-700 transition-colors"
          >
            Ask Codey
          </button>
        </form>
      </div>

      <Dialog open={isChatOpen} onOpenChange={setIsChatOpen}>
        <DialogContent className="max-w-xl w-full p-4">
          <DialogHeader>
            <DialogTitle>Chat with Codey</DialogTitle>
          </DialogHeader>
          <div className="h-80 overflow-y-auto">
            {LLMResponseError ? (
              <div className="flex flex-col items-center justify-center h-full text-red-500">
                <p className="text-sm text-gray-500">
                  {LLMResponseError}
                </p>
              </div>
            ) : (
              <LLMFeedback
                userQuestion={userAudioTranscript}
                LLMResponse={LLMResponse}
              />
            )}
          </div>
          <div className="border-gray-300 border rounded-md p-2">
            <Textarea
              onEnter={onSend}
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
              {!LLMFeedbackLoading && LLMResponse && !LLMResponseError ? (
                <FeedbackDialog feedbackType="chat" />
              ) : null}
              <Button
                variant="ghost"
                onClick={onSend}
                disabled={LLMFeedbackLoading}
              >
                {LLMFeedbackLoading ? <Loading /> : <MessageCircleQuestion />}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
} 