import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import apiClient from "@/lib/APIClient";
import { RootState } from "@/store";
import { MessageT } from "@/lib/types";
import { runCodeThunk } from "@/slices/CodeSlice";
import { areCodesEquivalentNaive, base64ToAudioUrl } from "@/lib/utils";

interface AssistantState {
  LLMResponse: string; // for llm chat feature response
  LLMResponseError: string;
  userAudioTranscript: string; // For displaying current question
  userAudioTranscriptInput: string; // For input field only
  assistantAudioUrl: string; // Consolidated audio URL
  hintLoading: boolean;
  hintError: string;
  chatHistory: MessageT[];
  chatId: number;
  LLMFeedbackLoading: boolean;
  assistantPopupText: string;
  proactiveFeedback: string;
  isPolling: boolean;
  lastSourceCodeForProactiveFeedback: string; // TODO: ensure current source code is different from last source code for proactive feedback, before making api request.
}

const initialChatHistory: MessageT[] = [];

export const getProactiveFeedbackThunk = createAsyncThunk<
  { audioUrl: string; textFeedback: string },
  void,
  { state: RootState }
>(
  "assistant/getProactiveFeedback",
  async (_, { getState, dispatch, rejectWithValue }) => {
    try {
      const state = getState();
      const {
        question: { question },
        code: { sourceCode, programmingLanguage },
        assistant: { assistantPopupText, lastSourceCodeForProactiveFeedback },
      } = state;

      // Check if the current code is equivalent to the last checked code
      if (
        lastSourceCodeForProactiveFeedback &&
        lastSourceCodeForProactiveFeedback.length > 0 &&
        areCodesEquivalentNaive(
          sourceCode,
          lastSourceCodeForProactiveFeedback,
          programmingLanguage.name
        )
      ) {
        return { audioUrl: "", textFeedback: "" };
      }

      // get proactive feedback
      const response = await apiClient.post("/llm-guide/proactive", {
        question,
        sourceCode,
        previousHint: assistantPopupText,
      });
      const { audioProactiveFeedbackBase64, proactiveFeedback } = response.data;

      // Update the last source code regardless of feedback result
      dispatch(setLastSourceCodeForProactiveFeedback(sourceCode));

      // if there is no feedback or the hint has already changed then return empty strings without saving to chat
      if (
        !proactiveFeedback ||
        !audioProactiveFeedbackBase64 ||
        assistantPopupText != getState().assistant.assistantPopupText
      ) {
        return { audioUrl: "", textFeedback: "" };
      }

      // Perform the chat/add-message call in the background
      (async () => {
        try {
          await apiClient.post("/chat/add-message", {
            chatId: state.assistant.chatId,
            messages: [{ role: "assistant", content: proactiveFeedback }],
          });
        } catch (error) {
          console.error("Error adding message to chat:", error);
        }
      })();

      const audioUrl = base64ToAudioUrl(audioProactiveFeedbackBase64);

      return { audioUrl, textFeedback: proactiveFeedback };
    } catch (error: any) {
      console.error("Error in getHintThunk:", error);
      return rejectWithValue(error.message || "Unknown error occurred");
    }
  }
);

export const getHintThunk = createAsyncThunk<
  { audioUrl: string; textHint: string },
  void,
  { state: RootState }
>("assistant/getHint", async (_, { getState, dispatch, rejectWithValue }) => {
  try {
    // clear old hint and feedback states and stop polling
    dispatch(setIsPolling(true));
    dispatch(setAssistantPopupText(""));

    // Ensure the code is executed and up-to-date
    await dispatch(runCodeThunk()).unwrap();

    const state = getState();
    const {
      question: { question },
      code: { sourceCode, codeExecuteResponse },
    } = state;

    // return hint early if all test cases passed
    if (
      codeExecuteResponse.numFailed == 0 &&
      codeExecuteResponse.numPassed > 0
    ) {
      return {
        audioUrl: "/assets/audio/test-cases-passed.mp3",
        textHint: "Well done! You have passed all the test cases.",
      };
    }

    const response = await apiClient.post("/llm-guide/hint", {
      question,
      sourceCode,
      testCases: codeExecuteResponse.testCases,
    });

    const { textHint, audioHintBase64 } = response.data;

    if (!textHint || !audioHintBase64) {
      throw new Error("Missing textHint or audioHintBase64 in response");
    }

    const audioUrl = base64ToAudioUrl(audioHintBase64);
    // Perform the chat/add-message call in the background
    (async () => {
      try {
        await apiClient.post("/chat/add-message", {
          chatId: state.assistant.chatId,
          messages: [
            { role: "user", content: "hint button pressed" },
            { role: "assistant", content: textHint },
          ],
        });
      } catch (error) {
        console.error("Error adding message to chat:", error);
      }
    })();

    // Start polling after hint is received
    dispatch(setIsPolling(true));
    dispatch(startPolling());

    return { audioUrl, textHint };
  } catch (error: any) {
    // Handle axios error responses
    if (error.response) {
      return rejectWithValue(error.response.data.error || "An error occurred");
    }
    // Handle other errors
    return rejectWithValue(error.message || "Unknown error occurred");
  }
});

export const getAssistantFeedbackThunk = createAsyncThunk<
  { assistantMsg: string; userMsg: string },
  void,
  { state: RootState }
>(
  "assistant/getAssistantFeedback",
  async (_, { getState, dispatch, rejectWithValue }) => {
    try {
      dispatch(setLLMResponse(""));
      await dispatch(runCodeThunk()).unwrap();

      const state = getState();
      const {
        question: { question },
        code: { sourceCode, codeExecuteResponse },
        assistant: { userAudioTranscriptInput, chatHistory },
      } = state;

      const recentChatHistory = chatHistory.slice(-10);
      const updatedChatHistory = [
        ...recentChatHistory,
        { role: "user", content: userAudioTranscriptInput },
      ];

      dispatch(setUserAudioTranscript(userAudioTranscriptInput));

      const response = await apiClient.post("/llm-guide", {
        question,
        sourceCode,
        userAudioTranscript: userAudioTranscriptInput,
        codeExecuteResponse,
        chatHistory: updatedChatHistory,
      });

      if (response.status !== 200) {
        return rejectWithValue(
          response.data.error || "An unexpected error occurred"
        );
      }

      const assistantMsg = response.data.response;

      // Only save to DB if we have valid content
      if (assistantMsg) {
        try {
          await apiClient.post("/chat/add-message", {
            chatId: state.assistant.chatId,
            messages: [
              { role: "user", content: userAudioTranscriptInput },
              { role: "assistant", content: assistantMsg },
            ],
          });
        } catch (error) {
          console.error("Error saving to chat:", error);
          // Don't throw here, just log the error
        }
      }

      return {
        assistantMsg,
        userMsg: userAudioTranscriptInput,
      };
    } catch (error: any) {
      // Handle specific error types
      if (error.response?.data?.type === "RATE_LIMIT") {
        return rejectWithValue("Please wait a moment before trying again");
      }
      if (error.response?.data?.type === "JSON_PARSE") {
        return rejectWithValue(
          "Failed to process the response. Please try again"
        );
      }

      return rejectWithValue(
        error.response?.data?.error || error.message || "An error occurred"
      );
    }
  }
);

export const getGeneralAssistantFeedbackThunk = createAsyncThunk<
  { assistantMsg: string; userMsg: string },
  void,
  { state: RootState }
>(
  "assistant/getGeneralAssistantFeedback",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const {
        assistant: { userAudioTranscriptInput, chatHistory },
      } = state;

      const recentChatHistory = chatHistory.slice(-10);
      const updatedChatHistory = [
        ...recentChatHistory,
        { role: "user", content: userAudioTranscriptInput },
      ];

      const response = await apiClient.post("/llm-guide/general", {
        userQuestion: userAudioTranscriptInput,
        chatHistory: updatedChatHistory,
      });

      if (response.status !== 200) {
        return rejectWithValue(
          response.data.error || "An unexpected error occurred"
        );
      }

      const assistantMsg = response.data.response;

      // Only save to DB if we have valid content
      if (assistantMsg) {
        try {
          await apiClient.post("/chat/add-message", {
            chatId: state.assistant.chatId,
            messages: [
              { role: "user", content: userAudioTranscriptInput },
              { role: "assistant", content: assistantMsg },
            ],
          });
        } catch (error) {
          console.error("Error saving to chat:", error);
          // Don't throw here, just log the error
        }
      }

      return {
        assistantMsg,
        userMsg: userAudioTranscriptInput,
      };
    } catch (error: any) {
      // Handle specific error types
      if (error.response?.data?.type === "RATE_LIMIT") {
        return rejectWithValue("Please wait a moment before trying again");
      }
      if (error.response?.data?.type === "JSON_PARSE") {
        return rejectWithValue(
          "Failed to process the response. Please try again"
        );
      }

      return rejectWithValue(
        error.response?.data?.error || error.message || "An error occurred"
      );
    }
  }
);

const initialState: AssistantState = {
  LLMResponse: "",
  LLMResponseError: "",
  userAudioTranscript: "",
  userAudioTranscriptInput: "",
  assistantAudioUrl: "",
  hintLoading: false,
  hintError: "",
  chatHistory: initialChatHistory,
  chatId: 0,
  assistantPopupText: "",
  LLMFeedbackLoading: false,
  proactiveFeedback: "",
  isPolling: false,
  lastSourceCodeForProactiveFeedback: "",
};

export const startPolling = createAsyncThunk<void, void, { state: RootState }>(
  "assistant/startPolling",
  async (_, { dispatch, getState }) => {
    const poll = async () => {
      const state = getState();
      if (!state.assistant.isPolling) return;

      const result = await dispatch(getProactiveFeedbackThunk()).unwrap();

      // If we got meaningful feedback, stop polling
      if (result.textFeedback) {
        dispatch(setIsPolling(false));
      } else {
        // Continue polling after delay
        setTimeout(poll, 5000); // Poll every 5 seconds
      }
    };

    poll();
  }
);

const AssistantSlice = createSlice({
  name: "assistant",
  initialState,
  reducers: {
    setLLMResponse: (state, action: PayloadAction<string>) => {
      state.LLMResponse = action.payload;
    },
    setUserAudioTranscript: (state, action: PayloadAction<string>) => {
      state.userAudioTranscript = action.payload;
    },
    setUserAudioTranscriptInput: (state, action: PayloadAction<string>) => {
      state.userAudioTranscriptInput = action.payload;
    },
    setChatId: (state, action: PayloadAction<number>) => {
      state.chatId = action.payload;
    },
    setAssistantPopupText: (state, action: PayloadAction<string>) => {
      state.assistantPopupText = action.payload;
    },
    setIsPolling: (state, action: PayloadAction<boolean>) => {
      state.isPolling = action.payload;
    },
    setLastSourceCodeForProactiveFeedback: (
      state,
      action: PayloadAction<string>
    ) => {
      state.lastSourceCodeForProactiveFeedback = action.payload;
    },
    setChatHistory: (state, action: PayloadAction<MessageT[]>) => {
      state.chatHistory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAssistantFeedbackThunk.pending, (state) => {
        state.LLMFeedbackLoading = true;
        state.LLMResponseError = ""; // Clear any previous errors
      })
      .addCase(getAssistantFeedbackThunk.fulfilled, (state, action) => {
        state.LLMResponse = action.payload.assistantMsg;
        state.chatHistory.push({
          role: "user",
          content: action.payload.userMsg,
        });
        state.chatHistory.push({
          role: "assistant",
          content: action.payload.assistantMsg,
        });
        state.userAudioTranscriptInput = "";
        state.LLMFeedbackLoading = false;
        state.LLMResponseError = ""; // Clear any errors on success
      })
      .addCase(getAssistantFeedbackThunk.rejected, (state, action) => {
        state.LLMFeedbackLoading = false;
        state.LLMResponseError =
          (action.payload as string) || "Error in getting assistant feedback";
        // Don't update chat history on error
      })
      .addCase(getHintThunk.pending, (state) => {
        state.hintLoading = true;
        state.hintError = "";
      })
      .addCase(getHintThunk.fulfilled, (state, action) => {
        state.hintLoading = false;
        state.assistantAudioUrl = action.payload.audioUrl;
        state.assistantPopupText = action.payload.textHint;
        state.chatHistory.push({
          role: "user",
          content: "hint button pressed",
        });
        state.chatHistory.push({
          role: "assistant",
          content: action.payload.textHint,
        });
      })
      .addCase(getHintThunk.rejected, (state, action) => {
        state.hintLoading = false;
        state.hintError =
          (action.payload as string) || "Error in generating hint";
      })
      .addCase(getProactiveFeedbackThunk.fulfilled, (state, action) => {
        if (action.payload.textFeedback) {
          state.proactiveFeedback = action.payload.textFeedback;
          state.assistantAudioUrl = action.payload.audioUrl;
          state.assistantPopupText = action.payload.textFeedback;
          state.chatHistory.push({
            role: "assistant",
            content: action.payload.textFeedback,
          });
          // Stop polling once we get feedback
          state.isPolling = false;
        }
      })
      .addCase(getGeneralAssistantFeedbackThunk.pending, (state) => {
        state.LLMFeedbackLoading = true;
        state.LLMResponseError = ""; // Clear any previous errors
      })
      .addCase(getGeneralAssistantFeedbackThunk.fulfilled, (state, action) => {
        state.LLMResponse = action.payload.assistantMsg;
        state.chatHistory.push({
          role: "user",
          content: action.payload.userMsg,
        });
        state.chatHistory.push({
          role: "assistant",
          content: action.payload.assistantMsg,
        });
        state.userAudioTranscriptInput = "";
        state.LLMFeedbackLoading = false;
        state.LLMResponseError = ""; // Clear any errors on success
      })
      .addCase(getGeneralAssistantFeedbackThunk.rejected, (state, action) => {
        state.LLMFeedbackLoading = false;
        state.LLMResponseError =
          (action.payload as string) || "Error in getting assistant feedback";
      });
  },
});

export const {
  setLLMResponse,
  setUserAudioTranscript,
  setUserAudioTranscriptInput,
  setChatId,
  setAssistantPopupText,
  setIsPolling,
  setLastSourceCodeForProactiveFeedback,
  setChatHistory,
} = AssistantSlice.actions;
export default AssistantSlice.reducer;
