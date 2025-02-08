import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import {
  getHintSystemPrompt,
  getHintUserPrompt,
  getTutorSystemPrompt,
  getTutorUserPrompt,
} from "@/lib/prompts";
import apiClient from "@/lib/APIClient";

interface FeedbackResponse {
  success: boolean;
  // Optionally extend with additional fields returned from the API if needed.
}

interface SubmitFeedbackPayload {
  feedbackText: string;
  feedbackType: "hint" | "chat";
}

// Create a thunk that submits feedback to the API using axios
export const submitFeedbackThunk = createAsyncThunk<
  FeedbackResponse,
  SubmitFeedbackPayload,
  { state: RootState; rejectValue: string }
>(
  "feedback/submitFeedback",
  async ({ feedbackText, feedbackType }, { getState, rejectWithValue }) => {
    console.log("Submitting feedback:", feedbackText);
    try {
      const state = getState();
      const question = state.question.question;
      const sourceCode = state.code.sourceCode;

      // Ensure a question is selected
      if (!question) {
        return rejectWithValue("No question selected");
      }

      let systemPromptUsed;
      let userPromptUsed;
      if (feedbackType === "hint") {
        // Generate the two prompts using shared functions
        systemPromptUsed = getHintSystemPrompt(question.content);
        userPromptUsed = getHintUserPrompt(
          sourceCode,
          state.code.codeExecuteResponse.testCases
        );
      } else if (feedbackType === "chat") {
        // Generate the two prompts using shared functions
        systemPromptUsed = getTutorSystemPrompt();
        userPromptUsed = getTutorUserPrompt(
          question.content,
          sourceCode,
          state.assistant.assistantPopupText
        );
      }

      // Prepare the payload by combining the feedback text with additional information from the state.
      // The LLMOutput is set to the assistantPopupText from the AssistantSlice.
      const payload = {
        feedbackText,
        systemPromptUsed,
        userPromptUsed,
        LLMOutput: state.assistant.assistantPopupText,
        questionName: question.name,
        feedbackType: "hint", // or "chat" / "general" as needed
      };

      const response = await apiClient.post("/feedback", payload);

      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(
          error.response.data.error || "An error occurred"
        );
      }
      return rejectWithValue(error.message || "Unknown error occurred");
    }
  }
);

interface FeedbackState {
  submitFeedbackStatus: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  feedbackResponse?: FeedbackResponse;
}

const initialState: FeedbackState = {
  submitFeedbackStatus: "idle",
  error: null,
};

export const FeedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {
    // You can add synchronous reducers here, if required.
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitFeedbackThunk.pending, (state) => {
        state.submitFeedbackStatus = "loading";
        state.error = null;
      })
      .addCase(submitFeedbackThunk.fulfilled, (state, action) => {
        state.submitFeedbackStatus = "succeeded";
        state.feedbackResponse = action.payload;
      })
      .addCase(submitFeedbackThunk.rejected, (state, action) => {
        state.submitFeedbackStatus = "failed";
        state.error = action.payload as string;
      });
  },
});

export default FeedbackSlice.reducer;
