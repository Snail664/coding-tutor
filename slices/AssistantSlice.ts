import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import apiClient from "@/lib/APIClient";
import { RootState } from "@/store";
import { MessageT } from "@/lib/types";
import { runCodeThunk } from "@/slices/CodeSlice";

interface AssistantState {
  LLMResponse: string;
  userAudioTranscript: string;
  audioHintUrl: string;
  hintLoading: boolean;
  hintError: string;
  chatHistory: MessageT[];
  chatId: string;
  LLMFeedbackLoading: boolean;
  assistantPopupText: string;
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

export const getHintThunk = createAsyncThunk<
  { audioUrl: string; textHint: string },
  void,
  { state: RootState }
>("assistant/getHint", async (_, { getState, dispatch, rejectWithValue }) => {
  try {
    // Ensure the code is executed and up-to-date
    const runCodeResult = await dispatch(runCodeThunk()).unwrap();

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

    return { audioUrl, textHint };
  } catch (error: any) {
    console.error("Error in getHintThunk:", error);
    return rejectWithValue(error.message || "Unknown error occurred");
  }
});

export const getAssistantFeedbackThunk = createAsyncThunk<
  { assistantMsg: string; userMsg: string },
  void,
  { state: RootState }
>("assistant/getAssistantFeedback", async (_, { getState, dispatch }) => {
  // run code first
  const runCodeResult = await dispatch(runCodeThunk()).unwrap();

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
});

const initialState: AssistantState = {
  LLMResponse: "",
  userAudioTranscript: "",
  audioHintUrl: "",
  hintLoading: false,
  hintError: "",
  chatHistory: initialChatHistory,
  chatId: "",
  LLMFeedbackLoading: false,
};

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
      .addCase(getAssistantFeedbackThunk.rejected, (state) => {
        state.LLMFeedbackLoading = false;
      })
      .addCase(getHintThunk.pending, (state) => {
        state.hintLoading = true;
        state.hintError = "";
      })
      .addCase(getHintThunk.fulfilled, (state, action) => {
        state.hintLoading = false;
        state.audioHintUrl = action.payload.audioUrl;
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
      .addCase(getHintThunk.rejected, (state) => {
        state.hintLoading = false;
        state.hintError = "Error in generating hint";
      });
  },
});

export const { setLLMResponse, setUserAudioTranscript, setChatId } =
  AssistantSlice.actions;
export default AssistantSlice.reducer;
