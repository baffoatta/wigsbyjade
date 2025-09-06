'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Search = () => {
  const [term, setTerm] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (term.trim()) {
      router.push(`/search?term=${encodeURIComponent(term.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center">
      <input
        type="text"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder="Search products..."
        className="px-4 py-2 border rounded-l-full focus:outline-none focus:ring-2 focus:ring-pink-300"
      />
      <button type="submit" className="px-4 py-2 bg-pink-500 text-white rounded-r-full hover:bg-pink-600">
        Search
      </button>
    </form>
  );
};

export default Search;
