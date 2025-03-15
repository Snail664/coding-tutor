"use client";
import { useState, useEffect } from "react";

const DynamicText = () => {
  const lines = [
    "Level up your coding skills with Codey the AI Tutor! 🚀",
    "No more sifting through StackOverflow forums or cookie-cutter chatbots! 🔍",
    "Get step-by-step guidance through problems while making you think and learn independently!"
  ];

  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < lines.length) {
      const timeout = setTimeout(() => {
        setVisibleLines(prev => [...prev, lines[currentIndex]]);
        setCurrentIndex(currentIndex + 1);
      }, 1000); // Delay each line by 1 sec

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, lines]);

  return (
    <p className="text-xl text-muted-foreground mb-12">
      {visibleLines.map((line, index) => (
        <span key={index} className="block opacity-0 animate-fade-in">{line}</span>
      ))}
    </p>
  );
};

export default DynamicText;
