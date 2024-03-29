"use client";
import { Tabs } from "@mantine/core";
import React, { useEffect, useState } from "react";
import StatisticChat from "./StatisticChat";
import { articleProps } from "@/types/article/article";
import AllArticleCardClient from "@/components/main/AllArticleCardClient";
import { userProps } from "@/types/user/user";
import { getUserFromClient } from "@/libs/actions/user/userClient";
import { getArticleByUserId } from "@/libs/actions/article/article";
import TabHomeLoading from "@/components/ui/TabHomeLoading";
type profileTabsProps = {
  userId: string;
};
const ProfilTabs: React.FC<profileTabsProps> = ({ userId }) => {
  const [userData, setUserData] = useState<userProps>();
  const [articles, setArticles] = useState<articleProps[]>();
  const [homeLoading, setHomeLoading] = useState(true);
  useEffect(() => {
    const fetchAllData = async () => {
      const userData = await getUserFromClient(userId);
      if (userData) setUserData(userData);
      const articleData = await getArticleByUserId(userId);
      if (articleData) setArticles(articleData);
      setHomeLoading(false);
    };
    fetchAllData();
  }, [userId]);
  return (
    <div className="w-2/3 py-10">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-3xl font-medium">{userData?.user_fullname}</h2>
      </div>
      <div className="flex items-center space-x-2 mx-2 sticky top-0 bg-base-100 z-10">
        <div className="w-full">
          <Tabs defaultValue="Home" color="black">
            <Tabs.List h={60}>
              <Tabs.Tab value="Home">Home</Tabs.Tab>
              <Tabs.Tab value="Articles">Articles</Tabs.Tab>
              <Tabs.Tab value="Library">Library</Tabs.Tab>
              <Tabs.Tab value="Statistic">Statistic</Tabs.Tab>
              <div className="ml-auto flex items-center">
                <label className="rounded-none border-b flex items-center">
                  <input type="text" className="grow focus:outline-none " />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="#606060"
                    className="w-4 h-4 opacity-70">
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
              {homeLoading ? (
                <div className="flex justify-center items-center w-full h-96">
                  <TabHomeLoading />
                </div>
              ) : (
                <div className="pr-11 h-auto overflow-y-scroll no-scrollbar">
                  <div className="space-y-2 ">
                    {articles &&
                      articles.map((articleslist) => {
                        return (
                          <AllArticleCardClient
                            article={articleslist}
                            userId={userId}
                            user={userData}
                            articleId={articleslist.article_id}
                          />
                        );
                      })}
                  </div>
                </div>
              )}
            </Tabs.Panel>
            <Tabs.Panel value="Articles">
              <div className="px-6">
                {/* Publish */}
                <div className="card card-side rounded-none items-center my-8 px-4 bg-base-200">
                  <div className="card-body px-4 space-y-4">
                    <div className="flex items-center space-x-4">
                      <h2 className="card-title text-2xl ">
                        Published articles
                      </h2>
                      <div className="badge bg-[#4ECB71] text-white py-4 px-4">
                        Publish
                      </div>
                    </div>
                    <div className="flex items-center space-x-9">
                      <div className="avatar items-center">
                        <div className="w-8 rounded-full">
                          <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                        </div>
                        <p className="ml-2 ">Heather McLeod in Human Parts</p>
                      </div>
                      <div>
                        <ul className="list-disc">
                          <li>10 articles</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div>
                    <img
                      src="https://images.unsplash.com/photo-1587440871875-191322ee64b0?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt=""
                      className="w-44"
                    />
                  </div>
                </div>
                {/* Pending */}
                <div className="card card-side rounded-none items-center my-8 px-4 bg-base-200">
                  <div className="card-body px-4 space-y-4">
                    <div className="flex items-center space-x-4">
                      <h2 className="card-title text-2xl ">Pending articles</h2>
                      <div className="badge bg-[#FFD556] text-white py-4 px-4">
                        Pending
                      </div>
                    </div>
                    <div className="flex items-center space-x-9">
                      <div className="avatar items-center">
                        <div className="w-8 rounded-full">
                          <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                        </div>
                        <p className="ml-2 ">Heather McLeod in Human Parts</p>
                      </div>
                      <div>
                        <ul className="list-disc">
                          <li>5 articles</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div>
                    <img
                      src="https://images.unsplash.com/photo-1587440871875-191322ee64b0?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt=""
                      className="w-44"
                    />
                  </div>
                </div>
                {/* Draft */}
                <div className="card card-side rounded-none items-center my-8 px-4 bg-base-200">
                  <div className="card-body px-4 space-y-4">
                    <div className="flex items-center space-x-4">
                      <h2 className="card-title text-2xl ">Drafted articles</h2>
                      <div className="badge bg-[#606060] opacity-50 text-white py-4 px-4">
                        Draft
                      </div>
                    </div>
                    <div className="flex items-center space-x-9">
                      <div className="avatar items-center">
                        <div className="w-8 rounded-full">
                          <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                        </div>
                        <p className="ml-2 ">Heather McLeod in Human Parts</p>
                      </div>
                      <div>
                        <ul className="list-disc">
                          <li>10 articles</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div>
                    <img
                      src="https://images.unsplash.com/photo-1587440871875-191322ee64b0?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt=""
                      className="w-44"
                    />
                  </div>
                </div>
                {/* hidden */}
                <div className="card card-side rounded-none items-center my-8 px-4 bg-base-200">
                  <div className="card-body px-4 space-y-4">
                    <div className="flex items-center space-x-4">
                      <h2 className="card-title text-2xl ">Hidden articles</h2>
                      <div className="badge bg-[#FF9A62] text-white py-4 px-4">
                        hidden
                      </div>
                    </div>
                    <div className="flex items-center space-x-9">
                      <div className="avatar items-center">
                        <div className="w-8 rounded-full">
                          <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                        </div>

                        <p className="ml-2 ">Heather McLeod in Human Parts</p>
                      </div>
                      <div>
                        <ul className="list-disc">
                          <li>2 articles</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div>
                    <img
                      src="https://images.unsplash.com/photo-1587440871875-191322ee64b0?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt=""
                      className="w-44"
                    />
                  </div>
                </div>
              </div>
            </Tabs.Panel>
            <Tabs.Panel value="Library">
              <div className="px-6">
                <div className="card card-side rounded-none items-center my-8 px-4 bg-base-200">
                  <div className="card-body px-4 space-y-4">
                    <div className="flex items-center space-x-4">
                      <h2 className="card-title text-2xl ">UX/UI</h2>
                    </div>
                    <div className="flex items-center space-x-9">
                      <div className="avatar items-center">
                        <div className="w-8 rounded-full">
                          <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                        </div>
                        <p className="ml-2 ">Heather McLeod in Human Parts</p>
                      </div>
                      <div>
                        <ul className="list-disc flex space-x-1">
                          <li>10 lists</li>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                            />
                          </svg>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div>
                    <img
                      src="https://images.unsplash.com/photo-1587440871875-191322ee64b0?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt=""
                      className="w-44"
                    />
                  </div>
                </div>
                <div className="card card-side rounded-none items-center my-8 px-4 bg-base-200">
                  <div className="card-body px-4 space-y-4">
                    <div className="flex items-center space-x-4">
                      <h2 className="card-title text-2xl ">Development</h2>
                    </div>
                    <div className="flex items-center space-x-9">
                      <div className="avatar items-center">
                        <div className="w-8 rounded-full">
                          <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                        </div>
                        <p className="ml-2 ">Heather McLeod in Human Parts</p>
                      </div>
                      <div>
                        <ul className="list-disc flex space-x-1">
                          <li>5 lists</li>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                            />
                          </svg>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div>
                    <img
                      src="https://images.unsplash.com/photo-1587440871875-191322ee64b0?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt=""
                      className="w-44"
                    />
                  </div>
                </div>
                <div className="card card-side rounded-none items-center my-8 px-4 bg-base-200">
                  <div className="card-body px-4 space-y-4">
                    <div className="flex items-center space-x-4">
                      <h2 className="card-title text-2xl ">Javascript</h2>
                    </div>
                    <div className="flex items-center space-x-9">
                      <div className="avatar items-center">
                        <div className="w-8 rounded-full">
                          <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                        </div>
                        <p className="ml-2 ">Heather McLeod in Human Parts</p>
                      </div>
                      <div>
                        <ul className="list-disc flex space-x-1">
                          <li>10 lists</li>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                            />
                          </svg>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div>
                    <img
                      src="https://images.unsplash.com/photo-1587440871875-191322ee64b0?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt=""
                      className="w-44"
                    />
                  </div>
                </div>
                <div className="card card-side rounded-none items-center my-8 px-4 bg-base-200">
                  <div className="card-body px-4 space-y-4">
                    <div className="flex items-center space-x-4">
                      <h2 className="card-title text-2xl ">Tester</h2>
                    </div>
                    <div className="flex items-center space-x-9">
                      <div className="avatar items-center">
                        <div className="w-8 rounded-full">
                          <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                        </div>
                        <p className="ml-2 ">Heather McLeod in Human Parts</p>
                      </div>
                      <div>
                        <ul className="list-disc flex space-x-1">
                          <li>2 lists</li>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                            />
                          </svg>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div>
                    <img
                      src="https://images.unsplash.com/photo-1587440871875-191322ee64b0?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt=""
                      className="w-44"
                    />
                  </div>
                </div>
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
                      <p className="text-center font-medium text-3xl">0</p>
                      <span className="text-center">Views</span>
                    </div>
                    <div className="Ups">
                      <p className="text-center font-medium text-3xl">0</p>
                      <span className="text-center">Ups</span>
                    </div>
                  </div>
                  <select className="select select-bordered">
                    <option disabled defaultValue={"Mar 2024"}>
                      Mar 2024
                    </option>
                    <option>Feb 2024</option>
                    <option>Jan 2024</option>
                  </select>
                </div>
                <StatisticChat />
              </div>
            </Tabs.Panel>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProfilTabs;
