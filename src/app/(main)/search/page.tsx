"use client"
import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const SearchPage: React.FC = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const router = useRouter();

  // Placeholder for search results
  // In a real application, you would fetch search results from an API or database
  const searchResults = [
    { id: 1, title: 'Example Article 1', snippet: 'This is a snippet from example article 1.' },
    { id: 2, title: 'Example Article 2', snippet: 'This is a snippet from example article 2.' },
  ].filter(result => result.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Search Results for "{query}"</h1>
      {searchResults.length > 0 ? (
        <ul>
          {searchResults.map(result => (
            <li key={result.id} className="mb-4">
              <h2 className="text-xl font-semibold">{result.title}</h2>
              <p>{result.snippet}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found for "{query}".</p>
      )}
    </div>
  );
};

export default SearchPage;
