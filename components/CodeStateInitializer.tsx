"use client";
import { useEffect } from "react";
import { useAppDispatch } from "@/store";
import { setSourceCode } from "@/slices/CodeSlice";
import { QuestionT } from "@/lib/types";
import { getTemplateCode } from "@/lib/utils";
import { LanguageName } from "@prisma/client";

export default function CodeStateInitializer({
  question,
}: {
  question: QuestionT;
}) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (question) {
      const initialSourceCode = getTemplateCode(
        question.templateCodes[0]?.language as LanguageName,
        question
      );

      dispatch(setSourceCode(initialSourceCode));
    }
  }, [dispatch, question]);

  return null;
}
