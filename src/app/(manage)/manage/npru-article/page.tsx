"use client";
import React, { useContext } from "react";
import ArticleTabs from "../../component/ArticleTabs";
import ArticleStat from "../../component/ArticleStat";
import ArticleApproveCard from "../../component/ArticleApproveCard";
import { ArticleContext } from "@/context/ArticleContext";
import { useSearchParams } from "next/navigation";

const Page = () => {
  const { articles, npruArticle, isLoading } = useContext(ArticleContext);
  const searchParams = useSearchParams();
  const articleQry = searchParams.get("article");
  const inprogressArticle = npruArticle.filter(
    (article) => article.article_status === "pending"
  );
  const approveArticle = npruArticle.filter(
    (article) => article.article_status === "public"
  ).length;
  const disapproveArticle = npruArticle.filter(
    (article) => article.article_status === "reject"
  ).length;

  const filterBySearchParams = npruArticle.filter((article) =>
    articleQry
      ? article.article_status === articleQry
      : article.article_status === "pending"
  );
  return (
    <div className="flex flex-col space-y-4">
      {/*Tabs*/}
      <div className="flex flex-col">
        <ArticleTabs
          generalArticleNumber={articles.length}
          npruArticleNumber={npruArticle.length}
          isActiveAt="Article from npru"
          isLoading={isLoading}
        />
        <div className="min-h-screen bg-[#F4F2FB]">
          <ArticleStat
            allArticle={npruArticle.length}
            inProgress={inprogressArticle.length}
            approve={approveArticle}
            disapprove={disapproveArticle}
            isLoading={isLoading}
            npruTab={true}
          />
          <div className="flex flex-col lg:flex-row flex-wrap w-full justify-center items-center mt-5">
            {filterBySearchParams.length > 0 ? (
              filterBySearchParams.map((article) => (
                <ArticleApproveCard
                  key={article.article_id}
                  article={article}
                />
              ))
            ) : (
              <div>No article on this status yet</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
