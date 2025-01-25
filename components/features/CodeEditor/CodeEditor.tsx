import React, { useRef } from "react";
import Editor, { OnMount } from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import { useTheme } from "next-themes";
import { useAppDispatch, useAppSelector } from "@/store";
import { setSourceCode } from "@/slices/CodeSlice";
const CodeEditor: React.FC = () => {
  // Type the editor reference as `monaco.editor.IStandaloneCodeEditor | null`
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const { sourceCode, programmingLanguage } = useAppSelector(
    (state) => state.code
  );
  const dispatch = useAppDispatch();
  const { theme } = useTheme();

  // Use the `onMount` prop to capture the editor instance and assign it to the ref
  const handleEditorMount: OnMount = (editor) => {
    editorRef.current = editor;
  };

  return (
    <div className="flex flex-col h-full code-editor">
      <Editor
        height="100%"
        width="100%"
        theme={theme === "dark" ? "vs-dark" : "light"}
        language={programmingLanguage.name}
        options={{ fontSize: 18 }}
        value={sourceCode}
        onChange={(value) => {
          if (value !== undefined) {
            dispatch(setSourceCode(value));
          }
        }}
        onMount={handleEditorMount} // Assign the editor instance on mount
      />
    </div>
  );
};

export default CodeEditor;
