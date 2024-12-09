import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import apiClient from "@/lib/APIClient";
import { RootState } from "@/store";
import { MessageT } from "@/lib/types";

interface AssistantState {
  LLMResponse: string;
  userAudioTranscript: string;
  audioHintUrl: string;
  hintLoading: boolean;
  hintError: string;
  chatHistory: MessageT[];
}

const initialChatHistory: MessageT[] = [];

export const getHintThunk = createAsyncThunk<
  { audioUrl: string; textHint: string },
  void,
  { state: RootState }
>("assistant/getHint", async (_, { getState, rejectWithValue }) => {
  try {
    const {
      question: { question },
      code: { sourceCode, codeExecuteResponse },
    } = getState();

    const response = await apiClient.post("/llm-guide/hint", {
      question,
      sourceCode,
      testCases: codeExecuteResponse.testCases,
    });

    // response.data should be JSON: { textHint: string, audioHintBase64: string }
    const { textHint, audioHintBase64 } = response.data;

    if (!textHint || !audioHintBase64) {
      throw new Error("Missing textHint or audioHintBase64 in response");
    }

    // Convert base64 to binary
    const binary = atob(audioHintBase64);
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
    const audioBlob = new Blob([bytes], { type: "audio/mpeg" });
    const audioUrl = URL.createObjectURL(audioBlob);

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
>("assistant/getAssistantFeedback", async (_, { getState }) => {
  const {
    question: { question },
    code: { sourceCode, codeExecuteResponse },
    assistant: { userAudioTranscript, chatHistory },
  } = getState();

  // Append the new user message to the chat history copy before sending it
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

  return {
    assistantMsg: response.data["response"],
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
  },
  extraReducers: (builder) => {
    builder.addCase(getAssistantFeedbackThunk.fulfilled, (state, action) => {
      state.LLMResponse = action.payload.assistantMsg;
      // Add the user and assistant messages to the chatHistory
      state.chatHistory.push({ role: "user", content: action.payload.userMsg });
      state.chatHistory.push({
        role: "assistant",
        content: action.payload.assistantMsg,
      });
    });
    builder.addCase(getHintThunk.pending, (state) => {
      state.hintLoading = true;
      state.hintError = "";
    });
    builder.addCase(getHintThunk.fulfilled, (state, action) => {
      state.hintLoading = false;
      state.audioHintUrl = action.payload.audioUrl;
      state.LLMResponse = action.payload.textHint;
      state.chatHistory.push({ role: "user", content: "hint button pressed" });
      state.chatHistory.push({
        role: "assistant",
        content: action.payload.textHint,
      });
    });
    builder.addCase(getHintThunk.rejected, (state) => {
      state.hintLoading = false;
      state.hintError = "Error in generating hint";
    });
  },
});

export const { setLLMResponse, setUserAudioTranscript } =
  AssistantSlice.actions;
export default AssistantSlice.reducer;
