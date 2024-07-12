import React, { useContext } from "react";
import { getAllArticles, getNpruArticle } from "@/libs/actions/article/article";
import ArticleTabs from "../../component/ArticleTabs";
import ArticleStat from "../../component/ArticleStat";
import ArticleApproveCard from "../../component/ArticleApproveCard";

const page = async ({
  searchParams,
}: {
  searchParams: { article: string };
}) => {
  console.log(searchParams.article);

  const allArticles = await getAllArticles();
  const npruArticles = await getNpruArticle();
  const inprogressArticles = npruArticles.filter(
    (article) => article.article_status === "pending"
  );
  const approveArticles = npruArticles.filter(
    (article) => article.article_status === "public"
  );
  const disapproveArticles = npruArticles.filter(
    (article) => article.article_status === "reject"
  );

  const filterBySearchParams = npruArticles.filter((article) => {
    if (searchParams && searchParams.article) {
      return article.article_status === searchParams.article;
    }
    return article.article_status === "pending";
  });

  return (
    <div className="flex flex-col space-y-4">
      {/*Tabs*/}
      <div className="flex flex-col">
        <ArticleTabs
          generalArticleNumber={allArticles.length}
          npruArticleNumber={npruArticles.length}
          isActiveAt="Article from npru"
        />
        <div className="min-h-screen bg-[#F4F2FB]">
          <ArticleStat
            allArticle={allArticles.length}
            inProgress={inprogressArticles.length}
            approve={approveArticles.length}
            disapprove={disapproveArticles.length}
            npruTab={true}
          />
          <div className="flex flex-col lg:flex-row flex-wrap w-full justify-center items-center mt-5">
            {filterBySearchParams.map((article) => (
              <ArticleApproveCard key={article.article_id} article={article} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
