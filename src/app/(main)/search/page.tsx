"use client"
import React from "react";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ArticleCard from "./component/ArticleCard";
import { getArticlesByTitlePattern } from "@/libs/actions/article/article";
import { articleProps } from "@/types/article/article";

const page: React.FC = async () => {
  const [articles, setArticles] = useState<articleProps[]>([]);
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const articles = await getArticlesByTitlePattern(query);
        setArticles(articles || []);
      } catch (error) {
        console.error("Error fetching articles:", error);
        setArticles([]);
      }
    };
    fetchArticles();
  }, [query]);

  return (
    <div className="container mx-auto min-h-screen w-screen p-10">
      <div className="flex flex-col justify-center items-center">
        <div className="text-2xl text-base-content uppercase font-semibold flex items-center space-x-2 mb-10">
          <h1 className="text-[#B4ABAB]">Search Results for </h1>
          <span className="text-red">{query}</span>
        </div>
        {articles && articles.length > 0 ? (
          <div className="flex flex-col -space-y-5 md:space-y-4 md:flex-wrap md:flex-row items-center justify-center w-full h-full md:space-x-6">
            {articles.map((article) => (
              <ArticleCard key={article.article_id} article={article} />
            ))}
          </div>
        ) : (
          <p className="mt-10">No results found for {query}</p>
        )}
      </div>
    </div>
  );
};

export default page;
