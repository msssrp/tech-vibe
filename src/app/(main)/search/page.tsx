// src/app/(main)/search/page.tsx
"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ArticleCard from "./component/ArticleCard";

const SearchPage: React.FC = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const router = useRouter();

  const searchResults = [
    {
      article_id: 1,
      article_title: "Ultimate ChatGPT cheatsheet for UX UI Designers: No Bullshit",
      article_description: "This is a article_description from example article 1.",
      article_cover:"https://images.unsplash.com/photo-1587440871875-191322ee64b0?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      article_id: 2,
      article_title: "Ultimate ChatGPT cheatsheet for UX UI Designers: No Bullshit",
      article_description: "This is a article_description from example article 2.",
      article_cover:"https://images.unsplash.com/photo-1587440871875-191322ee64b0?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      article_id: 3,
      article_title: "Ultimate ChatGPT cheatsheet for UX UI Designers: No Bullshit",
      article_description: "This is a article_description from example article 2.",
      article_cover:"https://images.unsplash.com/photo-1587440871875-191322ee64b0?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      article_id: 4,
      article_title: "Ultimate ChatGPT cheatsheet for UX UI Designers: No Bullshit",
      article_description: "This is a article_description from example article 2.",
      article_cover:"https://images.unsplash.com/photo-1587440871875-191322ee64b0?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      article_id: 5,
      article_title: "Ultimate ChatGPT cheatsheet for UX UI Designers: No Bullshit",
      article_description: "This is a article_description from example article 2.",
      article_cover:"https://images.unsplash.com/photo-1587440871875-191322ee64b0?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      article_id: 6,
      article_title: "Ultimate ChatGPT cheatsheet for UX UI Designers: No Bullshit",
      article_description: "This is a article_description from example article 2.",
      article_cover:"https://images.unsplash.com/photo-1587440871875-191322ee64b0?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
  ].filter((result) =>
    result.article_title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="container mx-auto min-h-screen w-screen p-10">
      <div className="flex flex-col justify-center items-center">
        <div className="text-2xl text-base-content uppercase font-semibold flex items-center space-x-2 mb-10">
          <h1 className="text-[#B4ABAB]">Search Results for </h1>
          <span className="text-red">{query}</span>
        </div>
        {searchResults.length > 0 ? (
          <div className="flex flex-col -space-y-5 md:space-y-4 md:flex-wrap md:flex-row items-center justify-center w-full h-full md:space-x-6">
            {searchResults.map((result) => (
              <ArticleCard key={result.article_id} article={result} />
            ))}
          </div>
        ) : (
          <p className="mt-10">No results found for {query}</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
