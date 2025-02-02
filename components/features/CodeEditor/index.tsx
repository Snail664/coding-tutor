"use client";
import { Code2 } from "lucide-react";
import CollapsiblePanel from "@/components/layout/CollapsiblePanel";
import CodeEditor from "./CodeEditor";
import LanguageSelector from "./LanguageSelector";

export default function EditorWindow() {
  return (
    <CollapsiblePanel
      icon={<Code2 />}
      title="Code"
      headerActions={<LanguageSelector />}
    >
      <CodeEditor />
    </CollapsiblePanel>
  );
}
