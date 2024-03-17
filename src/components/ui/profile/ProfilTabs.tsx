"use client";
import { Tabs, ScrollArea } from "@mantine/core";
import { articleslist, tag } from "@/components/ui/Items";
import React, { useState } from "react";
import StatisticChat from "./StatisticChat";

const ProfilTabs = () => {
  return (
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
          <ScrollArea
            className="pr-11 h-[150vh] overflow-auto"
            type="never"
            scrollbarSize={8}
            offsetScrollbars
          >
            <div className="space-y-2 ">
              {articleslist.map((articleslist, id) => {
                return (
                  <div
                    key={id}
                    className="card card-side border-b rounded-none items-center "
                  >
                    <div className="card-body px-4">
                      <div className="avatar items-center">
                        <div className="w-8 rounded-full">
                          <img src={articleslist.image} />
                        </div>
                        <p className="ml-2">{articleslist.author}</p>
                      </div>
                      <h2 className="card-title text-2xl mt-3">
                        {articleslist.title}
                      </h2>
                      <p className="line-clamp-2 ">
                        {articleslist.description}
                      </p>
                      <div className="flex justify-between items-center mt-3">
                        <div className="space-x-1 h-8 overflow-hidden w-full">
                          {tag.map((tag) => {
                            return (
                              <button
                                key={tag.tag_id}
                                className={`btn btn-sm badge bg-[#F2F2F2] rounded-full `}
                              >
                                <p>{tag.tag_name}</p>
                              </button>
                            );
                          })}
                        </div>
                        <div className="flex justify-between items-center w-2/3">
                          <div>
                            <p className="text-sm">7 min read</p>
                          </div>
                          <div>
                            <button className="btn btn-sm btn-circle btn-ghost hover:bg-white">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                                />
                              </svg>
                            </button>
                            <button className="btn btn-sm btn-circle btn-ghost hover:bg-white">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="#FFC107"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                                />
                              </svg>
                            </button>
                            <button className="btn btn-sm btn-circle btn-ghost hover:bg-white">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="#699BF7"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <img src={articleslist.image} alt="" className="w-96" />
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </Tabs.Panel>
        <Tabs.Panel value="Articles">
          <div className="px-6">
            {/* Publish */}
            <div className="card card-side rounded-none items-center my-8 px-4 bg-base-200">
              <div className="card-body px-4 space-y-4">
                <div className="flex items-center space-x-4">
                  <h2 className="card-title text-2xl ">Published articles</h2>
                  <div className="badge bg-[#4ECB71] text-white py-4 px-4">
                    Publish
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="avatar items-center">
                    <div className="w-8 rounded-full">
                      <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                    </div>
                  </div>
                  <p className="ml-2 ">Heather McLeod in Human Parts</p>
                  <p>
                    <ul className="list-disc">
                      <li>10 articles</li>
                    </ul>
                  </p>
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
                <div className="flex items-center">
                  <div className="avatar items-center">
                    <div className="w-8 rounded-full">
                      <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                    </div>
                  </div>
                  <p className="ml-2 ">Heather McLeod in Human Parts</p>
                  <p>
                    <ul className="list-disc">
                      <li>5 articles</li>
                    </ul>
                  </p>
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
                <div className="flex items-center">
                  <div className="avatar items-center">
                    <div className="w-8 rounded-full">
                      <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                    </div>
                  </div>
                  <p className="ml-2 ">Heather McLeod in Human Parts</p>
                  <p>
                    <ul className="list-disc">
                      <li>10 articles</li>
                    </ul>
                  </p>
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
                <div className="flex items-center">
                  <div className="avatar items-center">
                    <div className="w-8 rounded-full">
                      <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                    </div>
                  </div>
                  <p className="ml-2 ">Heather McLeod in Human Parts</p>
                  <p>
                    <ul className="list-disc">
                      <li>2 articles</li>
                    </ul>
                  </p>
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
                <div className="flex items-center">
                  <div className="avatar items-center">
                    <div className="w-8 rounded-full">
                      <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                    </div>
                  </div>
                  <p className="ml-2 ">Heather McLeod in Human Parts</p>
                  <p>
                    <ul className="list-disc flex space-x-1">
                      <li>10 lists</li>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                        />
                      </svg>
                    </ul>
                  </p>
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
                <div className="flex items-center">
                  <div className="avatar items-center">
                    <div className="w-8 rounded-full">
                      <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                    </div>
                  </div>
                  <p className="ml-2 ">Heather McLeod in Human Parts</p>
                  <p>
                    <ul className="list-disc flex space-x-1">
                      <li>5 lists</li>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                        />
                      </svg>
                    </ul>
                  </p>
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
                <div className="flex items-center">
                  <div className="avatar items-center">
                    <div className="w-8 rounded-full">
                      <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                    </div>
                  </div>
                  <p className="ml-2 ">Heather McLeod in Human Parts</p>
                  <p>
                    <ul className="list-disc flex space-x-1">
                      <li>10 lists</li>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                        />
                      </svg>
                    </ul>
                  </p>
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
                <div className="flex items-center">
                  <div className="avatar items-center">
                    <div className="w-8 rounded-full">
                      <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                    </div>
                  </div>
                  <p className="ml-2 ">Heather McLeod in Human Parts</p>
                  <p>
                    <ul className="list-disc flex space-x-1">
                      <li>2 lists</li>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                        />
                      </svg>
                    </ul>
                  </p>
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
                <option disabled selected>
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
  );
};

export default ProfilTabs;
