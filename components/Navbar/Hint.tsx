"use client";
import { Button } from "@/components/ui/button";
import { Lightbulb } from "lucide-react";
import Loading from "@/components/ui/loading";
import { useAppSelector } from "@/store";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useAppDispatch } from "@/store";
import { getHintThunk } from "@/slices/AssistantSlice";
import { useEffect, useState } from "react";
import AssistantSpeaking from "./AssistantSpeaking";

export default function HintButton() {
  const { hintLoading, hintError, assistantPopupText, assistantAudioUrl } =
    useAppSelector((state) => state.assistant);
  const { toast } = useToast();
  const { user } = useUser();
  const dispatch = useAppDispatch();
  const [isAssistantSpeakingHidden, setIsAssistantSpeakingHidden] =
    useState(true);

  // handle hint error
  useEffect(() => {
    if (hintError) {
      toast({
        title: "Error",
        description: hintError,
      });
    }
  }, [toast, hintError]);

  // handle assistant speaking popup
  useEffect(() => {
    if (assistantPopupText) {
      setIsAssistantSpeakingHidden(false);
    } else if (assistantPopupText == "") {
      setIsAssistantSpeakingHidden(true);
    }
  }, [assistantPopupText]);

  // handle hint button click
  const onHint = () => {
    if (!user) {
      toast({
        title: "Error",
        description: "Please login to get hint",
      });
      return;
    }
    dispatch(getHintThunk());
  };

  // keyboard shorcut
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
    <>
      {assistantAudioUrl && (
        <audio className="hidden" src={assistantAudioUrl} autoPlay />
      )}
      <AssistantSpeaking
        isHidden={isAssistantSpeakingHidden}
        setIsHidden={setIsAssistantSpeakingHidden}
      />
      <Button
        className="hint-button text-background hover:text-primary"
        variant="square"
        onClick={onHint}
        disabled={hintLoading}
      >
        {hintLoading ? (
          <Loading className="text-yellow-500" />
        ) : (
          <Lightbulb className="text-yellow-500" />
        )}
        <p className="ml-2">Hint</p>
      </Button>
    </>
  );
}
