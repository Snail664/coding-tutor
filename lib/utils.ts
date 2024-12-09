import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { LanguageName, QuestionT } from "./types"
import { LANGUAGES } from "@/slices/CodeSlice"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const truncateText = (text: string, maxLength: number) => {
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
}

export function getTemplateCode(language: LanguageName, question: QuestionT) {
  const templateCode = question.templateCodes.find(e => e.language == language)
  if (templateCode) return templateCode.code
  const defaultCode = LANGUAGES.find(e => e.name == language)
  if (defaultCode) return defaultCode.defaultCode
  else return ''
}

export function getLanguage(language: LanguageName) {
  return LANGUAGES.find(e => e.name === language)
}
