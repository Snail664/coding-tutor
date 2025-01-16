import React, { useState, useEffect } from "react";

function TypingEffect({
  text = "",
  speed = 100,
  onComplete,
}: {
  text: string;
  speed: number;
  onComplete: () => void;
}) {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Only type if we haven't reached the full text length
    if (index < text.length) {
      const typingTimeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, speed);

      // Cleanup the timeout
      return () => clearTimeout(typingTimeout);
    } else {
      // If a callback is provided, call it when typing finishes
      if (onComplete) onComplete();
    }
  }, [index, speed, text, onComplete]);

  return <span>{displayedText}</span>;
}

export default TypingEffect;
