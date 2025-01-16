import { useEffect, useRef, useState } from "react";

export default function SplitPane({
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
        newSize = rect.right - e.clientX;
      } else {
        newSize = rect.bottom - e.clientY;
      }
      newSize = Math.max(minSize, newSize);
      newSize = Math.min(maxSize, newSize);
      setSize(newSize);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.body.style.userSelect = "auto";
    };

    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      if (isResizing) {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        document.body.style.userSelect = "auto";
      }
    };
  }, [isResizing, minSize, maxSize, split]);

  const handleMouseDown = () => {
    setIsResizing(true);
    document.body.style.userSelect = "none";
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
      <div style={{ flex: 1, overflow: "auto" }}>{children[0]}</div>
      <div
        className="hover:bg-blue-400"
        style={{
          ...dividerStyles,
        }}
        onMouseDown={handleMouseDown}
      ></div>
      <div style={{ ...paneStyles }}>{children[1]}</div>
    </div>
  );
}
