import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import apiClient from "@/lib/APIClient";
import { RootState } from "@/store";
import { MessageT } from "@/lib/types";
import { runCodeThunk } from "@/slices/CodeSlice";
import { areCodesEquivalentNaive } from "@/lib/utils";

interface AssistantState {
  LLMResponse: string; // for llm chat feature response
  LLMResponseError: string;
  userAudioTranscript: string;
  assistantAudioUrl: string; // Consolidated audio URL
  hintLoading: boolean;
  hintError: string;
  chatHistory: MessageT[];
  chatId: string;
  LLMFeedbackLoading: boolean;
  assistantPopupText: string;
  proactiveFeedback: string;
  isPolling: boolean;
  lastSourceCodeForProactiveFeedback: string; // TODO: ensure current source code is different from last source code for proactive feedback, before making api request.
}

const initialChatHistory: MessageT[] = [];

// Utility function to ensure a chat exists
async function ensureChatExists(
  dispatch: any,
  getState: () => RootState
): Promise<string> {
  const state = getState();
  const {
    question: { question, previousQuestion },
    assistant: { chatId },
  } = state;

  if (!chatId || previousQuestion?.name !== question?.name) {
    const response = await apiClient.post("/chat/create", {
      messages: [
        {
          role: "system",
          content: `Starting chat for question: ${question?.name}`,
        },
      ],
    });
    const newChatId = response.data.id;
    dispatch(setChatId(newChatId));
    return newChatId;
  }
  return chatId;
}

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

      // ensure chat exists
      const validChatId = await ensureChatExists(dispatch, getState);

      // get proactive feedback
      const response = await apiClient.post("/llm-guide/proactive", {
        question,
        sourceCode,
        previousHint: assistantPopupText,
      });
      const { audioProactiveFeedbackBase64, proactiveFeedback } = response.data;

      // Update the last source code regardless of feedback result
      dispatch(setLastSourceCodeForProactiveFeedback(sourceCode));

      // if there is no feedback, return empty strings without saving to chat
      if (!proactiveFeedback || !audioProactiveFeedbackBase64) {
        return { audioUrl: "", textFeedback: "" };
      }

      // Perform the chat/add-message call in the background
      (async () => {
        try {
          await apiClient.post("/chat/add-message", {
            chatId: validChatId,
            messages: [{ role: "assistant", content: proactiveFeedback }],
          });
        } catch (error) {
          console.error("Error adding message to chat:", error);
        }
      })();

      // Fix the audio blob creation to match getHintThunk
      const binary = atob(audioProactiveFeedbackBase64);
      const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
      const audioBlob = new Blob([bytes], { type: "audio/mpeg" });
      const audioUrl = URL.createObjectURL(audioBlob);

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
    // Ensure the code is executed and up-to-date
    await dispatch(runCodeThunk()).unwrap();

    // Ensure chat exists
    const validChatId = await ensureChatExists(dispatch, getState);

    const state = getState();
    const {
      question: { question },
      code: { sourceCode, codeExecuteResponse },
    } = state;

    const response = await apiClient.post("/llm-guide/hint", {
      question,
      sourceCode,
      testCases: codeExecuteResponse.testCases,
    });

    const { textHint, audioHintBase64 } = response.data;

    if (!textHint || !audioHintBase64) {
      throw new Error("Missing textHint or audioHintBase64 in response");
    }

    const binary = atob(audioHintBase64);
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
    const audioBlob = new Blob([bytes], { type: "audio/mpeg" });
    const audioUrl = URL.createObjectURL(audioBlob);
    // Perform the chat/add-message call in the background
    (async () => {
      try {
        await apiClient.post("/chat/add-message", {
          chatId: validChatId,
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
      // run code first
      await dispatch(runCodeThunk()).unwrap();

      // Ensure chat exists
      const validChatId = await ensureChatExists(dispatch, getState);

      const state = getState();
      const {
        question: { question },
        code: { sourceCode, codeExecuteResponse },
        assistant: { userAudioTranscript, chatHistory },
      } = state;

      const updatedChatHistory = [
        ...chatHistory,
        { role: "user", content: userAudioTranscript },
      ];

      const response = await apiClient.post("/llm-guide", {
        question,
        sourceCode,
        userAudioTranscript,
        codeExecuteResponse,
        chatHistory: updatedChatHistory,
      });

      const assistantMsg = response.data["response"];

      await apiClient.post("/chat/add-message", {
        chatId: validChatId,
        messages: [
          { role: "user", content: userAudioTranscript },
          { role: "assistant", content: assistantMsg },
        ],
      });

      return {
        assistantMsg,
        userMsg: userAudioTranscript,
      };
    } catch (error: any) {
      // Handle axios error responses
      if (error.response) {
        // Return the error message from our API
        return rejectWithValue(
          error.response.data.error || "An error occurred"
        );
      }
      // Handle other errors
      return rejectWithValue(error.message || "Unknown error occurred");
    }
  }
);

const initialState: AssistantState = {
  LLMResponse: "",
  LLMResponseError: "",
  userAudioTranscript: "",
  assistantAudioUrl: "",
  hintLoading: false,
  hintError: "",
  chatHistory: initialChatHistory,
  chatId: "",
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
      console.log("polling proactive feedback...");
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
    setChatId: (state, action: PayloadAction<string>) => {
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAssistantFeedbackThunk.pending, (state) => {
        state.LLMFeedbackLoading = true;
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
        state.LLMFeedbackLoading = false;
      })
      .addCase(getAssistantFeedbackThunk.rejected, (state, action) => {
        state.LLMFeedbackLoading = false;
        state.LLMResponseError =
          (action.payload as string) || "Error in getting assistant feedback";
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
        console.log("getHintThunk.rejected", action);
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
      });
  },
});

export const {
  setLLMResponse,
  setUserAudioTranscript,
  setChatId,
  setAssistantPopupText,
  setIsPolling,
  setLastSourceCodeForProactiveFeedback,
} = AssistantSlice.actions;
export default AssistantSlice.reducer;
