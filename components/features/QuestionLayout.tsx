"use client";
import ExecutionWindow from "@/components/features/CodeExecution";
import QuestionWindow from "@/components/features/Question";
import EditorWindow from "@/components/features/CodeEditor";
import SplitPane from "@/components/layout/SplitPane";
import { useEffect, useState } from "react";

export default function QuestionLayout() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!dimensions.width || !dimensions.height) {
    return null;
  }

  return (
    <>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "row",
          overflow: "hidden",
        }}
      >
        <SplitPane
          split="vertical"
          minSize={500}
          defaultSize={dimensions.width * 0.5}
          maxSize={Math.max(dimensions.width - 500, 500)}
        >
          <QuestionWindow />
          <SplitPane
            split="horizontal"
            minSize={53}
            defaultSize={dimensions.height / 2}
            maxSize={Math.max(dimensions.height - 308, 53)}
          >
            <EditorWindow />
            <ExecutionWindow />
          </SplitPane>
        </SplitPane>
      </div>
    </>
  );
}
