// CollapsiblePanel.tsx

import { ChevronUp, ChevronDown } from "lucide-react";
import React, { useState } from "react";

interface CollapsiblePanelProps {
  title: string;
  icon: React.ReactNode;
  headerActions?: React.ReactNode;
  children: React.ReactNode;
}

export default function CollapsiblePanel({
  title,
  icon,
  headerActions,
  children,
}: CollapsiblePanelProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <div className="flex flex-col h-full rounded-lg">
      {/* Header */}
      <div className="flex items-center p-2 bg-menuBackground">
        <div className="flex items-center gap-2 w-full">
          {icon}
          <div>{title}</div>
        </div>
        <div className="flex items-center gap-2">
          {headerActions}
          <button onClick={() => setIsCollapsed(!isCollapsed)}>
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
