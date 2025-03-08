'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function CodeySearch() {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search logic here
  };

  return (
    <div className="w-full max-w-3xl mx-auto relative">
      <form onSubmit={handleSearch} className="relative">
        <Input
          type="text"
          placeholder="What can Codey help you with?"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full py-6 pl-12 pr-4 text-lg rounded-2xl shadow-lg border-2 border-primary/20 focus:border-primary/50 transition-all dark:bg-gray-900"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <button
          type="submit"
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-primary dark:bg-gray-800 text-white px-4 py-2 rounded-xl hover:bg-primary/90 dark:hover:bg-gray-700 transition-colors"
        >
          Ask Codey
        </button>
      </form>
    </div>
  );
} 