import * as React from "react";

import { cn } from "@/lib/utils";

interface TextareaProps extends React.ComponentProps<"textarea"> {
  /**
   * A callback to be invoked when the user presses Enter (without Shift)
   */
  onEnter?: () => void;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, onKeyDown, onEnter, ...props }, ref) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      // If Enter is pressed without Shift, prevent the default newline
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        onEnter && onEnter();
      }
      // Execute any additional onKeyDown handlers passed through props
      if (onKeyDown) {
        onKeyDown(e);
      }
    };

    return (
      <textarea
        className={cn(
          "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        onKeyDown={handleKeyDown}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
