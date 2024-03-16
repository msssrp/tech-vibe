"use client";
import React, { useState } from "react";
import { ScrollArea } from "@mantine/core";
import { articleslist, tag } from "@/components/ui/Items";
import AllArticleCard from "@/components/main/AllArticleCard";
import Image from "next/image";

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
                className="btn btn-circle btn-ghost hover:bg-white "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.0}
                  stroke="currentColor"
                  className="w-7 h-7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-3 shadow bg-base-100 rounded-box w-96 flex flex-row"
              >
                {tag.map((tag) => {
                  return (
                    <button
                      key={tag.tag_id}
                      className={`btn btn-sm rounded-full badge bg-[#F2F2F2] text-[15px] mx-1 my-0.5`}
                    >
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
                    className={`badge bg-[#F2F2F2] text-black text-[15px] py-3 mr-1`}
                  >
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
            offsetScrollbars
          >
            <div className="space-y-2 ">
              {articleslist.map((articleslist, id) => {
                return (
                  <AllArticleCard
                    article={articleslist}
                    key={articleslist.id}
                  />
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
                    <div
                      key={articleslist.id}
                      className="card-compact bg-[#F8F8F8] rounded-md px-4 ">
                      <div className="card-body">
                        <div className="avatar items-center">
                          <div className="w-8 rounded-full">
                            <Image
                              alt={articleslist.title}
                              src={articleslist.image}
                              height={32}
                              width={32}
                              className="w-full"
                            />
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
                    <div
                      key={articleslist.id}
                      className="card-compact bg-[#F8F8F8] rounded-md px-4">
                      <div className="card-body">
                        <div className="avatar items-center">
                          <div className="w-8 rounded-full">
                            <Image
                              alt={articleslist.title}
                              src={articleslist.image}
                              height={32}
                              width={32}
                              className="w-full"
                            />
                          </div>
                          <p className="ml-2 text-[#606060] flex items-center ">
                            {articleslist.author}
                            <span className="ml-1">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="#952124"
                                strokeWidth={1.5}
                                className="w-4 h-4"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
                                  clipRule="evenodd"
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
                        className={`btn btn-sm badge bg-[#f2f2f2] rounded-full m-1`}
                      >
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
