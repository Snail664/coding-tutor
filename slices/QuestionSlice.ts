import { createSlice } from "@reduxjs/toolkit";
import { QuestionT } from "@/lib/types";
import { QuestionDifficulty } from "@prisma/client";

// import apiClient from "@/lib/APIClient";

// Define an async thunk to fetch questions
// export const fetchQuestions = createAsyncThunk(
//   "questions/fetchQuestions",
//   async () => {
//     const response = await apiClient.get("/questions");
//     const questions = response.data;

//     // Parse testCases for each question
//     return questions.map((question: QuestionT) => ({
//       ...question,
//       testCases: question.testCases.map((testCase: any) => ({
//         ...testCase,
//         input: JSON.parse(testCase.input),
//         expectedOutput: JSON.parse(testCase.expectedOutput),
//       })),
//     }));
//   }
// );

export type QuestionListItemT = {
  name: string;
  difficulty: QuestionDifficulty;
};

const initialState = {
  previousQuestion: null as QuestionT | null,
  question: null as QuestionT | null,
  questionList: [] as QuestionListItemT[],
  status: "idle",
  error: null as string | null,
};

export const QuestionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    updateQuestion: (state, action) => {
      state.previousQuestion = state.question;
      state.question = action.payload;
    },
    updateQuestionList: (state, action) => {
      state.questionList = action.payload;
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(fetchQuestions.pending, (state) => {
  //       state.status = "loading";
  //     })
  //     .addCase(fetchQuestions.fulfilled, (state, action) => {
  //       state.status = "succeeded";
  //       state.questionList = action.payload;
  //       state.previousQuestion = action.payload[0];
  //       state.question = action.payload[0]; // Set the first question as the initial question
  //     })
  //     .addCase(fetchQuestions.rejected, (state, action) => {
  //       state.status = "failed";
  //       state.error = action.error.message ?? null;
  //     });
  // },
});

export const { updateQuestion, updateQuestionList } = QuestionSlice.actions;
export default QuestionSlice.reducer;
