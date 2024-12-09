"use client";

import React, { useState, useEffect, useRef } from "react";

function SplitPane({
  split,
  minSize,
  maxSize,
  defaultSize,
  children,
}: {
  split: string;
  minSize: number;
  maxSize: number;
  defaultSize: number;
  children: [React.ReactNode, React.ReactNode];
}) {
  const [size, setSize] = useState(defaultSize);
  const [isResizing, setIsResizing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const paneStyles =
    split === "vertical"
      ? { width: size, height: "100%", overflow: "auto" }
      : { height: size, width: "100%", overflow: "auto" };

  const dividerStyles =
    split === "vertical"
      ? { cursor: "col-resize", width: "5px" }
      : { cursor: "row-resize", height: "5px" };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing || !containerRef.current) return;
      let newSize;
      const rect = containerRef.current.getBoundingClientRect();
      if (split === "vertical") {
        newSize = e.clientX - rect.left;
      } else {
        newSize = e.clientY - rect.top;
      }
      newSize = Math.max(minSize, newSize);
      newSize = Math.min(maxSize, newSize);
      setSize(newSize);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      if (isResizing) {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      }
    };
  }, [isResizing, minSize, maxSize, split]);

  const handleMouseDown = () => {
    setIsResizing(true);
  };

  return (
    <div
      ref={containerRef}
      style={{
        display: "flex",
        flexDirection: split === "vertical" ? "row" : "column",
        height: "100%",
        width: "100%",
      }}
    >
      <div style={{ ...paneStyles }}>{children[0]}</div>
      <div
        style={{
          backgroundColor: "grey",
          ...dividerStyles,
        }}
        onMouseDown={handleMouseDown}
      ></div>
      <div style={{ flex: 1, overflow: "auto" }}>{children[1]}</div>
    </div>
  );
}

export default function Page() {
  return (
    <div className="h-screen w-screen p-5">
      <SplitPane
        split="vertical"
        minSize={400}
        defaultSize={window.innerWidth / 2}
        maxSize={window.innerWidth - 400}
      >
        <div className="bg-red-300 h-full w-full">left side</div>
        <SplitPane
          split="horizontal"
          minSize={100}
          defaultSize={window.innerHeight / 2}
          maxSize={window.innerHeight - 100}
        >
          <div className="bg-green-300 h-full w-full">top right</div>
          <div className="bg-green-500 h-full w-full">bottom right</div>
        </SplitPane>
      </SplitPane>
    </div>
  );
}
