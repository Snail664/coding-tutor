export interface MessageT {
  role: "user" | "assistant";
  content: string;
}

export enum QuestionDifficulty {
    Easy = "easy",
    Medium = "medium",
    Hard = "hard"
  }

export interface TestCase {
    input: string[] | number[];
    expectedOutput: string | number | boolean;
    description: string;
}

export interface TestResult {
  testCase: TestCase;
  actualOutput: string;
  passed: boolean;
  error?: string;
  userPrints: string;
}

export interface CodeExecuteResponseT {
  testCases: TestResult[];
  numPassed: number;
  numFailed: number;
  stdout: string;
  stderr: string;
  message: string;
  category: CodeExecuteResponseCategory;
}

export interface LanguageRunner {
  prepareCode(userCode: string, testCase: TestCase[]): string;
  runCode(code: string): Promise<CodeExecuteResponseT>;
}


export enum LanguageName {
  Javascript = 'javascript',
  Python = 'python',
  Typescript = 'typescript',
  Java = 'java',
  Cpp = 'c++'
}

export type TemplateCodeT = {
  code: string;
  language: LanguageName;
}

export type QuestionT = {
    name: string;
    difficulty: QuestionDifficulty;
    content: string;
    templateCodes: TemplateCodeT[];
    testCases: TestCase[];
  };


  export enum CodeExecuteResponseCategory {
    Error = "error",
    Success = "success",
  }

  export type ProgrammingLanguageT = {
    name: LanguageName;
    icon: string;
    version: string;
    defaultCode: string;
  };