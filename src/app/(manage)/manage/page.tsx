import React from "react";
import ArticleTabs from "../component/ArticleTabs";
import ArticleStat from "../component/ArticleStat";
import {
  getAllArticlesWithUser,
  getNpruArticle,
} from "@/libs/actions/article/article";
import DataTable from "@/components/main/table/DataTable";

const page = async ({
  searchParams,
}: {
  searchParams: { article: string };
}) => {
  console.log(searchParams.article);

  const allArticles = await getAllArticlesWithUser();
  const npruArticles = await getNpruArticle();
  const inprogressArticles = allArticles.filter(
    (article) => article.article_status === "pending"
  );
  const approveArticles = allArticles.filter(
    (article) => article.article_status === "public"
  );
  const disapproveArticles = allArticles.filter(
    (article) => article.article_status === "reject"
  );

  const complaintArticles = allArticles.filter(
    (article) => article.article_status === "complaint"
  );
  return (
    <div className="flex flex-col space-y-4">
      {/*Tabs*/}
      <div className="flex flex-col ">
        <ArticleTabs
          generalArticleNumber={allArticles.length}
          npruArticleNumber={npruArticles.length}
          isActiveAt="Gerneral articles"
        />
        <div className="min-h-screen bg-[#F4F2FB] px-5 lg:px-0 pb-4">
          <ArticleStat
            allArticle={allArticles.length}
            inProgress={inprogressArticles.length}
            approve={approveArticles.length}
            disapprove={disapproveArticles.length}
            complanint={complaintArticles.length}
          />
          <div className="flex flex-col lg:flex-row flex-wrap w-full justify-center items-center mt-5 px-5 lg:px-0">
            <DataTable articlesWithUser={allArticles} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
