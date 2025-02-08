"use client";
import { ChevronUp, ChevronDown } from "lucide-react";
import React, { useState } from "react";

interface CollapsiblePanelProps {
  title: string;
  icon: React.ReactNode;
  headerActions?: React.ReactNode;
  children: React.ReactNode;
  onCollapsedChange?: (isCollapsed: boolean) => void;
}

export default function CollapsiblePanel({
  title,
  icon,
  headerActions,
  children,
  onCollapsedChange,
}: CollapsiblePanelProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleCollapse = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    onCollapsedChange?.(newState);
  };

  return (
    <div className="flex flex-col h-full rounded-lg">
      {/* Header */}
      <div className="flex items-center p-2 bg-menuBackground">
        <div className="flex items-center gap-2 w-full">
          {icon}
          <div className="text-sm">{title}</div>
        </div>
        <div className="flex items-center gap-2">
          {headerActions}
          <button onClick={handleCollapse}>
            {isCollapsed ? <ChevronDown /> : <ChevronUp />}
          </button>
        </div>
      </div>

      {/* Content */}
      {!isCollapsed && (
        <div className="flex-1 overflow-auto bg-contentBackground">
          {children}
        </div>
      )}
    </div>
  );
}
