import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  ProgrammingLanguageT,
  CodeExecuteResponseT,
  CodeExecuteResponseCategory,
} from "@/lib/types";
import { LanguageName } from "@prisma/client";
import { getTemplateCode } from "@/lib/utils";
import { RunnerFactory } from "@/lib/runners";
import { RootState } from "@/store";

export const LANGUAGES: ProgrammingLanguageT[] = [
  {
    name: LanguageName.python,
    icon: "py",
    version: "3.10.0",
    defaultCode: "# insert code below",
  },
  {
    name: LanguageName.javascript,
    icon: "js",
    version: "1.32.3",
    defaultCode: "// insert code below",
  },
];

// Define the initial state with the default value
const initialState: ProgrammingLanguageT = LANGUAGES[0];
const initialCodeExecuteResponse: CodeExecuteResponseT = {
  testCases: [],
  numPassed: 0,
  numFailed: 0,
  stdout: "",
  stderr: "",
  message: "",
  sourceCode: "",
  category: CodeExecuteResponseCategory.Error,
};

export const runCodeThunk = createAsyncThunk<
  CodeExecuteResponseT,
  void,
  { state: RootState }
>("code/runCode", async (_, { getState, rejectWithValue }) => {
  try {
    const state = getState();
    const { sourceCode, codeExecuteResponse, programmingLanguage } = state.code;
    const { question } = state.question;
    if (!question) {
      return rejectWithValue("No question selected");
    }

    // Check if the code output is already updated
    if (codeExecuteResponse.sourceCode === sourceCode) {
      return codeExecuteResponse; // Return existing response if code is up-to-date
    }

    const runner = RunnerFactory.getRunner(programmingLanguage.name);
    const completeCode = runner.prepareCode(sourceCode, question.testCases);
    const result = await runner.runCode(completeCode, sourceCode);

    // Add testCase information back to each result
    const updatedResult = {
      ...result,
      testCases: result.testCases.map((testResult, index) => ({
        ...testResult,
        testCase: question.testCases[index],
      })),
    };

    return updatedResult;
  } catch (error: any) {
    return rejectWithValue(error.message || "Failed to run code");
  }
});

export const CodeSlice = createSlice({
  name: "code",
  initialState: {
    programmingLanguage: initialState,
    programmingLanguageList: LANGUAGES,
    sourceCode: "",
    codeExecuteResponse: initialCodeExecuteResponse,
    runCodeLoading: false,
  },
  reducers: {
    updateProgrammingLanguage: (state, action) => {
      state.programmingLanguage = action.payload.programmingLanguage;
      state.sourceCode = getTemplateCode(
        action.payload.programmingLanguage.name,
        action.payload.question
      );
    },
    setSourceCode: (state, action) => {
      state.sourceCode = action.payload;
    },
    setCodeExecuteResponse: (state, action) => {
      state.codeExecuteResponse = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(runCodeThunk.pending, (state) => {
        state.runCodeLoading = true;
      })
      .addCase(runCodeThunk.fulfilled, (state, action) => {
        console.log("runCodeThunk.fulfilled", action.payload);
        state.codeExecuteResponse = action.payload;
        state.runCodeLoading = false;
      })
      .addCase(runCodeThunk.rejected, (state) => {
        state.runCodeLoading = false;
        // Handle error if needed
      });
  },
});

export const {
  updateProgrammingLanguage,
  setSourceCode,
  setCodeExecuteResponse,
} = CodeSlice.actions;
export default CodeSlice.reducer;
