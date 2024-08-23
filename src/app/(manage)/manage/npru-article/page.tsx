import React from "react";
import {
  getAllArticlesWithUser,
  getNpruArticleWithUser,
} from "@/libs/actions/article/article";
import ArticleTabs from "../../component/ArticleTabs";
import ArticleStat from "../../component/ArticleStat";
import DataTable from "@/components/main/table/DataTable";

const page = async ({
  searchParams,
}: {
  searchParams: { article: string };
}) => {
  console.log(searchParams.article);

  const allArticles = await getAllArticlesWithUser();
  const npruArticles = await getNpruArticleWithUser();
  const inprogressArticles = npruArticles.filter(
    (article) => article.article_status === "pending"
  );
  const approveArticles = npruArticles.filter(
    (article) => article.article_status === "public"
  );
  const disapproveArticles = npruArticles.filter(
    (article) => article.article_status === "reject"
  );
  const complaintArticles = allArticles.filter(
    (article) => article.article_status === "complaint"
  );
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
            allArticle={npruArticles.length}
            inProgress={inprogressArticles.length}
            approve={approveArticles.length}
            disapprove={disapproveArticles.length}
            complanint={complaintArticles.length}
          />
          <div className="flex flex-col lg:flex-row flex-wrap w-full justify-center items-center mt-5">
            <DataTable articlesWithUser={npruArticles} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
