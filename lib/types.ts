import { LanguageName, QuestionDifficulty } from "@prisma/client";

export interface MessageT {
  role: "user" | "assistant";
  content: string;
}

export interface TestCase {
  input: string | string[] | number[] | number[][];
  expectedOutput: string | number | boolean | number[];
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
  sourceCode: string;
  category: CodeExecuteResponseCategory;
}

export interface LanguageRunner {
  prepareCode(userCode: string, testCase: TestCase[]): string;
  runCode(
    preparedCode: string,
    originalCode: string
  ): Promise<CodeExecuteResponseT>;
}

export type TemplateCodeT = {
  code: string;
  language: LanguageName;
};

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

export interface Auth0User {
  auth0_sid: string;
  auth0_sub: string;
  auth0_name: string | null;
  auth0_email: string | null;
  auth0_picture: string | null;
  isWalkthroughEnabled: boolean;
}
