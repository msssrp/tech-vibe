"use client";
import { Tabs } from "@mantine/core";
import React, { useEffect, useState } from "react";
import AllArticleCardClient from "@/components/main/AllArticleCardClient";
import { useRouter, useSearchParams } from "next/navigation";
import { userProps } from "@/types/user/user";
import { articleProps } from "@/types/article/article";
import ArticleCard from "./childComponent/ArticleCard";
import SavedArticleCard from "./childComponent/SavedArticleCard";
import { readlistsProps } from "@/types/readlists/readlists";
import StatisticChart from "./StatisticChart";
import CountUp from "react-countup";
import {
  getAllArticlesViews,
  getAllArticleUps,
  getArticlesViewsWithDate,
} from "@/libs/actions/article/articleStat";
type profileTabsProps = {
  user: userProps;
  userRole:
    | {
        user_role_name: string;
      }[]
    | null;
  sessionUserId: string;
  articles: articleProps[];
  userArticles?: articleProps[];
  readlists?: readlistsProps[] | null;
};

type statsData = {
  articleViewsWithDate:
    | {
        views: number;
        ups: number;
        date: string;
      }[]
    | null;
};

const ProfilTabs: React.FC<profileTabsProps> = ({
  user,
  sessionUserId,
  userRole,
  articles,
  userArticles,
  readlists,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabValue = searchParams.get("tab") ?? "Home";
  const [articleViews, setArticleViews] = useState<number | null>();
  const [totalUps, setTotalUps] = useState<number | null>();
  const [statsData, setStatsData] =
    useState<statsData["articleViewsWithDate"]>();
  useEffect(() => {
    const getUserStats = async () => {
      const articleViews = await getAllArticlesViews(sessionUserId);
      setArticleViews(articleViews);
      const totalUps = await getAllArticleUps(sessionUserId);
      setTotalUps(totalUps);
      const articleViewsWithDate = await getArticlesViewsWithDate(
        sessionUserId
      );
      setStatsData(articleViewsWithDate);
    };
    getUserStats();
  }, [readlists, userArticles, sessionUserId]);
  return (
    <div className="w-2/3 py-10">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-3xl font-medium">{user.user_fullname}</h2>
      </div>
      <div className="flex items-center space-x-2 mx-2 sticky top-0 bg-base-100 z-10">
        <div className="w-full">
          <Tabs
            defaultValue={tabValue}
            color="black"
            onChange={(tab) => {
              router.replace(`?tab=${tab}`);
            }}
          >
            <Tabs.List h={60}>
              <Tabs.Tab value="Home">Home</Tabs.Tab>
              {user.user_id === sessionUserId && (
                <>
                  <Tabs.Tab value="Articles">Articles</Tabs.Tab>
                  <Tabs.Tab value="Library">Library</Tabs.Tab>
                  <Tabs.Tab value="Statistic">Statistic</Tabs.Tab>
                </>
              )}

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
            <Tabs.Panel value="Home">
              <div className="pr-11 h-auto overflow-y-scroll no-scrollbar">
                <div className="space-y-2 ">
                  {articles &&
                    articles.map((articleslist) => {
                      return (
                        <AllArticleCardClient
                          key={articleslist.article_id}
                          article={articleslist}
                          userId={user.user_id}
                          user={user}
                          articleId={articleslist.article_id}
                          userRole={userRole}
                          interactBtn={true}
                        />
                      );
                    })}
                </div>
              </div>
            </Tabs.Panel>
            {user.user_id === sessionUserId && userArticles && (
              <>
                <Tabs.Panel value="Articles">
                  <div className="px-6">
                    <ArticleCard
                      user={user}
                      cardTitle="Published"
                      articleStatus="Publish"
                      articleTotal={
                        userArticles.filter(
                          (article) => article.article_status === "public"
                        ).length
                      }
                      articleCover={userArticles.reduce<string[]>(
                        (acc, item) => {
                          if (
                            item.article_status === "public" &&
                            item.article_cover !== undefined
                          ) {
                            acc.push(item.article_cover);
                          }
                          return acc;
                        },
                        []
                      )}
                    />
                    <ArticleCard
                      user={user}
                      cardTitle="Pending"
                      articleStatus="Pending"
                      articleTotal={
                        userArticles.filter(
                          (article) => article.article_status === "pending"
                        ).length
                      }
                      articleCover={userArticles.reduce<string[]>(
                        (acc, item) => {
                          if (
                            item.article_status === "pending" &&
                            item.article_cover !== undefined
                          ) {
                            acc.push(item.article_cover);
                          }
                          return acc;
                        },
                        []
                      )}
                    />
                    <ArticleCard
                      user={user}
                      cardTitle="Drafted"
                      articleStatus="Draft"
                      articleTotal={
                        userArticles.filter(
                          (article) => article.article_status === "draft"
                        ).length
                      }
                      articleCover={userArticles.reduce<string[]>(
                        (acc, item) => {
                          if (
                            item.article_status === "draft" &&
                            item.article_cover !== undefined
                          ) {
                            acc.push(item.article_cover);
                          }
                          return acc;
                        },
                        []
                      )}
                    />
                    <ArticleCard
                      user={user}
                      cardTitle="Hidden"
                      articleStatus="Hidden"
                      articleTotal={
                        userArticles.filter(
                          (article) => article.article_status === "hidden"
                        ).length
                      }
                      articleCover={userArticles.reduce<string[]>(
                        (acc, item) => {
                          if (
                            item.article_status === "hidden" &&
                            item.article_cover !== undefined
                          ) {
                            acc.push(item.article_cover);
                          }
                          return acc;
                        },
                        []
                      )}
                    />
                  </div>
                </Tabs.Panel>
                <Tabs.Panel value="Library">
                  <div className="px-6">
                    {readlists &&
                      readlists.map((readlist) => (
                        <SavedArticleCard
                          key={readlist.readlists_id}
                          user={user}
                          readlist={readlist}
                        />
                      ))}
                  </div>
                </Tabs.Panel>
                <Tabs.Panel value="Statistic">
                  <div className="px-6">
                    <div className="flex justify-between items-center my-10">
                      <h2 className="text-3xl font-medium text-[#606060]">
                        Your Article stats
                      </h2>
                    </div>
                    <div className="my-10 flex justify-between items-center ">
                      <div className="flex items-center space-x-24">
                        <div className="Views">
                          <p className="text-center font-medium text-3xl">
                            <CountUp
                              end={articleViews ? articleViews : 0}
                              duration={4}
                            />
                          </p>
                          <span className="text-center">Views</span>
                        </div>
                        <div className="Ups">
                          <p className="text-center font-medium text-3xl">
                            <CountUp
                              end={totalUps ? totalUps : 0}
                              duration={4}
                            />
                          </p>
                          <span className="text-center">Ups</span>
                        </div>
                      </div>
                    </div>
                    {statsData && (
                      <StatisticChart articleViewsWithDate={statsData} />
                    )}
                  </div>
                </Tabs.Panel>
              </>
            )}
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProfilTabs;
