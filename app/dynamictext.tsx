"use client";
import { useState, useEffect } from "react";

const DynamicText = () => {
  const lines = [
    "Level up your coding skills with Codey the AI Tutor! 🚀",
    "No more sifting through StackOverflow forums or cookie-cutter chatbots! 🔍",
    "Get step-by-step guidance through problems while letting you think and learn independently!"
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

  // Calculate the height needed for all lines - reduced spacing
  const totalHeight = lines.length * 2; // Less space between lines

  return (
    <div style={{ minHeight: `${totalHeight}em` }} className="relative w-full">
      {visibleLines.map((line, index) => (
        <div 
          key={index} 
          className="animate-in fade-in duration-700 text-gray-700 dark:text-gray-300 px-2"
          style={{ 
            position: 'relative', 
            marginBottom: '0.5rem',
            lineHeight: '1.3',
            maxWidth: '100%',
            wordWrap: 'break-word'
          }}
        >
          {line}
        </div>
      ))}
    </div>
  );
};

export default DynamicText;
