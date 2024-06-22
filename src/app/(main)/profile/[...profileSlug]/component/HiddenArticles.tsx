"use client";
import AllArticleCardClient from "@/components/main/AllArticleCardClient";
import { articleProps } from "@/types/article/article";
import { userProps } from "@/types/user/user";
import { Tabs } from "@mantine/core";
import Link from "next/link";
import React from "react";

type hiddenArticles = {
  userId: string;
  articles: articleProps[];
  user: userProps;
  userRole:
    | {
        user_role_name: string;
      }[]
    | null
    | undefined;
};

const HiddenArticles: React.FC<hiddenArticles> = ({
  userId,
  articles,
  user,
  userRole,
}) => {
  return (
    <div className="w-2/3 py-10">
      <div className="flex items-center space-x-6 mb-2">
        <h2 className="text-3xl font-medium">Hidden articles</h2>
        <div className="badge bg-[#FF9A62] text-white py-5 px-4">Hidden</div>
      </div>
      <div className="flex items-center space-x-2 mx-2 sticky top-0 bg-base-100 z-10">
        <div className="w-full">
          <Tabs defaultValue="Articles" color="black">
            <Tabs.List h={60}>
              <Tabs.Tab value="Home">
                <Link href={`/profile/${userId}`}>Home</Link>
              </Tabs.Tab>
              <Tabs.Tab value="Articles">
                <Link href={`/profile/${userId}?tab=Articles`}>Articles</Link>
              </Tabs.Tab>
              <Tabs.Tab value="Library ">
                <Link href={`/profile/${userId}?tab=Library`}>Library</Link>
              </Tabs.Tab>
              <Tabs.Tab value="Statistic">
                <Link href={`/profile/${userId}?tab=Statistic`}>Statistic</Link>
              </Tabs.Tab>
              <div className="ml-auto flex items-center">
                <label className="rounded-none border-b flex items-center">
                  <input type="text" className="grow focus:outline-none " />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="#606060"
                    className="w-4 h-4 opacity-70"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </label>
              </div>
            </Tabs.List>
            <Tabs.Panel value="Articles">
              <div className="pr-11 h-auto overflow-y-scroll no-scrollbar">
                <div className="space-y-2 ">
                  {articles &&
                    articles.map((article) => (
                      <AllArticleCardClient
                        key={article.article_id}
                        article={article}
                        userId={userId}
                        user={user}
                        articleId={article.article_id}
                        userRole={userRole}
                        interactBtn={true}
                      />
                    ))}
                </div>
              </div>
            </Tabs.Panel>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default HiddenArticles;
