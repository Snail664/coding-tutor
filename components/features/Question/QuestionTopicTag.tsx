import React from 'react';

interface TopicTagProps {
  topic: string;
}

export default function TopicTag({ topic }: TopicTagProps) {
  return (
    <span
      className="px-2 py-0.5 rounded text-xs font-semibold inline-block bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 mr-1 mb-1"
      style={{ minWidth: "40px", textAlign: "center" }}
    >
      {topic}
    </span>
  );
} 