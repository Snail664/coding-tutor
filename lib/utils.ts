import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { LanguageName, QuestionT } from "./types";
import { LANGUAGES } from "@/slices/CodeSlice";
import { OpenAI } from "openai";

export function parseLLMResponse(
  result: OpenAI.Chat.Completions.ChatCompletion,
  key: string
): string {
  try {
    const content = result.choices[0].message.content;
    if (!content) return "";

    // Try parsing with potential wrapper text
    try {
      return JSON.parse(content.slice(8, -4))[key];
    } catch {
      // Try direct JSON parse if first attempt fails
      return JSON.parse(content)[key];
    }
  } catch (error) {
    console.error("Error parsing LLM response:", error);
    return "";
  }
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const truncateText = (text: string, maxLength: number) => {
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

export function getTemplateCode(language: LanguageName, question: QuestionT) {
  const templateCode = question.templateCodes.find(
    (e) => e.language == language
  );
  if (templateCode) return templateCode.code;
  const defaultCode = LANGUAGES.find((e) => e.name == language);
  if (defaultCode) return defaultCode.defaultCode;
  else return "";
}

export function getLanguage(language: LanguageName) {
  return LANGUAGES.find((e) => e.name === language);
}

/**
 * Naive implementation of code equivalence check. Do not use for critical tasks.
 * Currently, it is only used for proactive feedback module which is not as critical.
 * For critical tasks, such as the code running feature, we do an exact match for now.
 * @param code1 - The first code string to compare.
 * @param code2 - The second code string to compare.
 * @param language - The language of the code.
 * @returns A boolean indicating whether the codes are equivalent.
 */
export function areCodesEquivalentNaive(
  code1: string,
  code2: string,
  language: LanguageName
): boolean {
  // Remove all whitespace
  const removeWhitespace = (str: string) => str.replace(/\s/g, "");

  // Language-specific comment patterns
  const commentPatterns = {
    [LanguageName.Python]: {
      singleLine: /#.*$/gm,
      multiLine: /"""[\s\S]*?"""|'''[\s\S]*?'''/g,
    },
    [LanguageName.Javascript]: {
      singleLine: /\/\/.*$/gm,
      multiLine: /\/\*[\s\S]*?\*\//g,
    },
    [LanguageName.Typescript]: {
      singleLine: /\/\/.*$/gm,
      multiLine: /\/\*[\s\S]*?\*\//g,
    },
    [LanguageName.Java]: {
      singleLine: /\/\/.*$/gm,
      multiLine: /\/\*[\s\S]*?\*\//g,
    },
    [LanguageName.Cpp]: {
      singleLine: /\/\/.*$/gm,
      multiLine: /\/\*[\s\S]*?\*\//g,
    },
  };

  // Language-specific print patterns
  const printPatterns = {
    [LanguageName.Python]: /print\s*\([^)]*\)/g,
    [LanguageName.Javascript]:
      /console\.(log|info|debug|warn|error)\s*\([^)]*\)/g,
    [LanguageName.Typescript]:
      /console\.(log|info|debug|warn|error)\s*\([^)]*\)/g,
    [LanguageName.Java]: /System\.(out|err)\.(println|print)\s*\([^)]*\)/g,
    [LanguageName.Cpp]: /(std::)?cout\s*<<[^;]*;|printf\s*\([^)]*\)/g,
  };

  // Remove comments based on language
  const removeComments = (str: string) => {
    const patterns = commentPatterns[language];
    if (!patterns) return str;

    // Remove single line comments
    str = str.replace(patterns.singleLine, "");
    // Remove multi-line comments
    str = str.replace(patterns.multiLine, "");
    return str;
  };

  // Remove print statements based on language
  const removePrints = (str: string) => {
    const pattern = printPatterns[language];
    return pattern ? str.replace(pattern, "") : str;
  };

  // Process both code strings
  const processCode = (code: string) => {
    return removeWhitespace(removePrints(removeComments(code)));
  };

  return processCode(code1) === processCode(code2);
}
