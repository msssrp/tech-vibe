import { getAllArticle, getNpruArticle } from "@/libs/actions/article/article";
import getUserSession from "@/libs/actions/user/auth/getSession";
import { getUser } from "@/libs/actions/user/user";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";
import ArticleTabs from "../../component/ArticleTabs";
import ArticleStat from "../../component/ArticleStat";
import ArticleApproveCard from "../../component/ArticleApproveCard";

const page = async ({
  searchParams,
}: {
  searchParams: { article: string };
}) => {
  const user = await getUserSession();
  if (!user.data.user) return redirect("/");
  const userData = await getUser(user.data.user.id);
  const articles = await getAllArticle();
  const npruArticle = await getNpruArticle();
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
    searchParams.article
      ? article.article_status === searchParams.article
      : article.article_status === "pending"
  );
  return (
    <div className="flex flex-col space-y-4">
      {/*Profile*/}
      <div className="flex items-center space-x-5 p-9">
        <div className="avatar">
          <div className="w-20 rounded-full">
            <Image
              width={120}
              height={120}
              src={userData ? userData.user_profile : ""}
              alt={"User"}
            />
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <h1 className="text-2xl font-semibold">
            Welcome back, {userData.user_fullname}
          </h1>
          <div className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
              />
            </svg>

            <span className="text-base-content">
              You have a list of managing articles 30,complaints 3
            </span>
          </div>
        </div>
      </div>
      {/*Tabs*/}
      <div className="flex flex-col">
        <ArticleTabs
          generalArticleNumber={articles.length}
          npruArticleNumber={npruArticle.length}
          isActiveAt="Article from npru"
        />
        <div className="min-h-screen bg-[#F4F2FB]">
          <ArticleStat
            allArticle={npruArticle.length}
            inProgress={inprogressArticle.length}
            approve={approveArticle}
            disapprove={disapproveArticle}
            npruTab={true}
          />
          <div className="flex flex-wrap w-full justify-center items-center mt-5">
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

export default page;
