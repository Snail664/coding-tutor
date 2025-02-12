"use client";
import { useEffect } from "react";
import { useAppDispatch } from "@/store";
import { setChatId, setChatHistory } from "@/slices/AssistantSlice";
import { MessageT } from "@/lib/types";
export default function AssistantStateInitializer({
  chatid,
  messages,
}: {
  chatid: number;
  messages: MessageT[];
}) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setChatId(chatid));
    dispatch(
      setChatHistory(
        messages.map((message) => ({
          role: message.role as "user" | "assistant",
          content: message.content,
        }))
      )
    );
  }, [dispatch, chatid, messages]);

  return null;
}
