"use client";
import AllArticleCardClient from "@/components/main/AllArticleCardClient";
import { articleProps } from "@/types/article/article";
import { userProps } from "@/types/user/user";
import { Tabs } from "@mantine/core";
import Link from "next/link";
import React from "react";

type library = {
  userId: string;
  user: userProps;
  result: {
    user: userProps;
    userRole:
      | {
          user_role_name: string;
        }[]
      | null;
    article: articleProps;
  }[];
};

const Library: React.FC<library> = ({ user, userId, result }) => {
  return (
    <div className="lg:w-2/3 py-10">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-3xl font-medium">{user.user_fullname}</h2>
      </div>
      <div className="flex items-center space-x-2 md:mx-2 sticky top-0 bg-base-100 z-10">
        <div className="w-full">
          <Tabs defaultValue="Library" color="black">
            <Tabs.List h={60}>
              <Tabs.Tab value="Home">
                <Link href={`/profile/${userId}`}>Home</Link>
              </Tabs.Tab>
              <Tabs.Tab value="Articles">
                <Link href={`/profile/${userId}?tab=Articles`}>Articles</Link>
              </Tabs.Tab>
              <Tabs.Tab value="Library">
                <Link href={`/profile/${userId}?tab=Library`}>Library</Link>
              </Tabs.Tab>
              <Tabs.Tab value="Statistic">
                <Link href={`/profile/${userId}?tab=Statistic`}>Statistic</Link>
              </Tabs.Tab>
              <div className="sm:ml-auto sm:flex items-center hidden">
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
            <Tabs.Panel value="Library">
              <div className="lg:pr-11 h-auto overflow-y-scroll no-scrollbar">
                <div className="space-y-2 Library">
                  {result.map((item) => (
                    <AllArticleCardClient 
                      key={item.article.article_id}
                      user={item.user}
                      article={item.article}
                      userRole={item.userRole}
                      articleId={item.article.article_id}
                      userId={user.user_id}
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

export default Library;
