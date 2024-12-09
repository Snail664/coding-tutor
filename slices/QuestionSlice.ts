import { createSlice } from "@reduxjs/toolkit";
import { QUESTIONS } from "@/lib/constants";
import { QuestionT } from "@/lib/types";

const initialQuestionList: QuestionT[] = QUESTIONS;
const initialQuestion: QuestionT = QUESTIONS[0];

export const QuestionSlice = createSlice({
  name: "question",
  initialState: {
    question: initialQuestion,
    questionList: initialQuestionList,
  },
  reducers: {
    updateQuestion: (state, action) => {
      state.question = action.payload;
    },
  },
});

export const { updateQuestion } = QuestionSlice.actions;
export default QuestionSlice.reducer;
