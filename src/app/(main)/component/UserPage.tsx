"use client";
import React, { useState } from "react";
import { ScrollArea } from "@mantine/core";
import { articleslist, tag } from "@/components/ui/Items";
import AllArticleCard from "@/components/main/AllArticleCard";

const UserPage = () => {
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);

  const sliceArticleslist = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, articleslist.length);
    return articleslist.slice(startIndex, endIndex);
  };
  return (
    <div className="container mx-auto px-44">
      <div className="flex divide-x h-auto">
        {/* left */}
        <div className="w-2/3 py-10">
          <div className="flex items-center space-x-2 border-b px-2 sticky top-0 bg-base-100 z-10">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-circle btn-ghost hover:bg-white ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.0}
                  stroke="currentColor"
                  className="w-7 h-7">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-3 shadow bg-base-100 rounded-box w-96 flex flex-row">
                {tag.map((tag) => {
                  return (
                    <button
                      key={tag.tag_id}
                      className={`btn btn-sm rounded-full badge bg-[#F2F2F2] text-[15px] mx-1 my-0.5`}>
                      <p>{tag.tag_name}</p>
                    </button>
                  );
                })}
              </ul>
            </div>
            <div className="topic">
              <button className="btn btn-ghost w-28 px-2 text-md hover:bg-white text-[#606060] hover:text-black">
                All articles
              </button>
            </div>
            <div className="topic">
              <button className="btn btn-ghost px-2 hover:bg-white text-md text-[#606060] hover:text-black">
                Following
              </button>
            </div>
            <div className="selected-tag border-l pl-6 line-clamp-1">
              {tag.map((tag) => {
                return (
                  <button
                    key={tag.tag_id}
                    className={`badge bg-[#F2F2F2] text-black text-[15px] py-3 mr-1`}>
                    <p>{tag.tag_name}</p>
                  </button>
                );
              })}
            </div>
          </div>
          {/* allArticles */}
          <ScrollArea
            className="pr-11 h-[150vh] overflow-auto"
            type="never"
            scrollbarSize={8}
            offsetScrollbars>
            <div className="space-y-2 ">
              {articleslist.map((articleslist) => {
                return (
                  <div className="card card-side border-b rounded-none items-center ">
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
                                className={`btn btn-sm badge bg-[#F2F2F2] rounded-full `}>
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
                                className="w-6 h-6">
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
                                className="w-6 h-6">
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
                                className="w-6 h-6">
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
        </div>
        {/* right */}
        <div className="w-2/6 py-12 pl-11 pr-2 ">
          <div className="flex items-center">
            <div className="grid grid-row-3">
              {/* popularArticles */}
              <div className="w-full space-y-3 mb-6 ">
                <h2 className="uppercase font-semibold text-lg">
                  Popular articles
                </h2>
                {sliceArticleslist().map((articleslist) => {
                  return (
                    <div className="card-compact bg-[#F8F8F8] rounded-md px-4 ">
                      <div className="card-body">
                        <div className="avatar items-center">
                          <div className="w-8 rounded-full">
                            <img src={articleslist.image} />
                          </div>
                          <p className="ml-2 text-[#606060]">
                            {articleslist.author}
                          </p>
                        </div>
                        <div className="card-title line-clamp-2">
                          <p className="font-normal text-base">
                            {articleslist.title}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div className="text-center pt-3">
                  <a href="#" className="underline cursor-pointer ">
                    show more
                  </a>
                </div>
              </div>
              {/* npruArticles */}
              <div className="w-full space-y-3 mb-6">
                <h2 className="uppercase font-semibold text-lg">
                  Technology articles By NPRU
                </h2>
                {sliceArticleslist().map((articleslist) => {
                  return (
                    <div className="card-compact bg-[#F8F8F8] rounded-md px-4">
                      <div className="card-body">
                        <div className="avatar items-center">
                          <div className="w-8 rounded-full">
                            <img src={articleslist.image} />
                          </div>
                          <p className="ml-2 text-[#606060] flex items-center ">
                            {articleslist.author}
                            <span className="ml-1">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="#952124"
                                strokeWidth={1.5}
                                className="w-4 h-4">
                                <path
                                  fill-rule="evenodd"
                                  d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
                                  clip-rule="evenodd"
                                />
                              </svg>
                            </span>
                          </p>
                        </div>
                        <div className="card-title line-clamp-2">
                          <p className="font-normal text-base">
                            {articleslist.title}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div className="text-center pt-3">
                  <a href="#" className="underline cursor-pointer">
                    show more
                  </a>
                </div>
              </div>
              {/* populartag */}
              <div className="w-full">
                <h2 className="uppercase font-semibold text-lg">Popular tag</h2>
                <div className="mt-2 ">
                  {tag.map((tag) => {
                    return (
                      <button
                        key={tag.tag_id}
                        className={`btn btn-sm badge bg-[#f2f2f2] rounded-full m-1`}>
                        <p>{tag.tag_name}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
