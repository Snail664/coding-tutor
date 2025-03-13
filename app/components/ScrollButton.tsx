'use client';

export default function ScrollButton() {
  return (
    <button 
      onClick={() => {
        document.getElementById('questions-section')?.scrollIntoView({ 
          behavior: 'smooth' 
        });
      }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer hover:opacity-100 transition-opacity"
      aria-label="Scroll to questions"
    >
      <div className="w-8 h-8 border-b-2 border-r-2 border-primary transform rotate-45 opacity-75 hover:opacity-100"></div>
    </button>
  );
} 