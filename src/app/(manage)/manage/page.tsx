import React, { useContext } from "react";
import ArticleTabs from "../component/ArticleTabs";
import ArticleStat from "../component/ArticleStat";
import ArticleApproveCard from "../component/ArticleApproveCard";
import { getAllArticles, getNpruArticle } from "@/libs/actions/article/article";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";

const page = async ({
  searchParams,
}: {
  searchParams: { article: string };
}) => {
  console.log(searchParams.article);

  const allArticles = await getAllArticles();
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

  const filterBySearchParams = allArticles.filter((article) => {
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
          isActiveAt="Gerneral articles"
        />
        <div className="min-h-screen bg-[#F4F2FB]">
          <ArticleStat
            allArticle={allArticles.length}
            inProgress={inprogressArticles.length}
            approve={approveArticles.length}
            disapprove={disapproveArticles.length}
            npruTab={false}
          />
          <div className="w-full flex justify-center items-center my-5">
            <div className="overflow-x-auto w-full flex flex-col justify-center items-center mx-9 bg-white rounded-xl drop-shadow-md">
              <table className="table table-zebra table-fixed">
                <thead className="h-20">
                  <tr className="uppercase text-center font-semibold text-black">
                    <th className="w-16"></th>
                    <th>Articles</th>
                    <th>Name</th>
                    <th>CreateAT</th>
                    {/* <th>Status</th> */}
                  </tr>
                </thead>
                <tbody className="text-center">
                  {filterBySearchParams.map((article) => (
                    <ArticleApproveCard
                      key={article.article_id}
                      article={article}
                    />
                  ))}
                </tbody>
              </table>
              {/* pagination */}
              {/* <div className="flex justify-center items-center my-8">
                <div className="flex pagination-all space-x-2">
                  <button className="btn btn-outline border-[#EBE7E7]">
                    <FaCaretLeft className="w-5 h-5 text-[#606060]" />
                    Back
                  </button>
                  <div className="pagination-number">
                    <button className="btn btn-ghost btn-active">1</button>
                    <button className="btn btn-ghost">2</button>
                    <button className="btn btn-ghost">3</button>
                    <button className="btn btn-ghost">4</button>
                  </div>
                  <button className="btn btn-outline border-[#EBE7E7]">
                    Next
                    <FaCaretRight className="w-5 h-5 text-[#606060]" />
                  </button>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
