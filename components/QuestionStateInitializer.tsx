"use client";
import { useEffect } from "react";
import { useAppDispatch } from "@/store";
import {
  QuestionListItemT,
  updateQuestion,
  updateQuestionList,
} from "@/slices/QuestionSlice";
import { QuestionT } from "@/lib/types";

export default function QuestionStateInitializer({
  question,
  questionList,
}: {
  question: QuestionT;
  questionList: QuestionListItemT[];
}) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (question) {
      const question_state = {
        content: question.content,
        name: question.name,
        difficulty: question.difficulty,
        testCases: question.testCases,
        templateCodes: question.templateCodes,
      };
      dispatch(updateQuestion(question_state));
    }
  }, [dispatch, question]);

  useEffect(() => {
    if (questionList) {
      dispatch(updateQuestionList(questionList));
    }
  }, [dispatch, questionList]);

  return null;
}
