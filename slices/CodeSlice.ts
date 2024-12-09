import { createSlice } from "@reduxjs/toolkit";
import { ProgrammingLanguageT, LanguageName, CodeExecuteResponseT, CodeExecuteResponseCategory } from "@/lib/types";
import { getTemplateCode } from "@/lib/utils";
import { QUESTIONS } from "@/lib/constants";

export const LANGUAGES: ProgrammingLanguageT[] = [
  {
    name: LanguageName.Python,
    icon: "py",
    version: "3.10.0",
    defaultCode: "# insert code below",
  },
  {
    name: LanguageName.Javascript,
    icon: "js",
    version: "1.32.3",
    defaultCode: "// insert code below",
  }
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
  category: CodeExecuteResponseCategory.Error,
};
const initialSourceCode: string = getTemplateCode(LANGUAGES[0].name, QUESTIONS[0]);

export const CodeSlice = createSlice({
    name: "code",
    initialState: {
      programmingLanguage: initialState,
      programmingLanguageList: LANGUAGES,
      sourceCode: initialSourceCode,
      codeExecuteResponse: initialCodeExecuteResponse,
    },
    reducers: {
      updateProgrammingLanguage: (state, action) => {
        state.programmingLanguage = action.payload.programmingLanguage;
        state.sourceCode = getTemplateCode(action.payload.programmingLanguage.name, action.payload.question);
      },
      setSourceCode: (state, action) => {
        state.sourceCode = action.payload;
      },
      setCodeExecuteResponse: (state, action) => {
        state.codeExecuteResponse = action.payload;
      }
    }
});

export const { updateProgrammingLanguage, setSourceCode, setCodeExecuteResponse } = CodeSlice.actions;
export default CodeSlice.reducer;