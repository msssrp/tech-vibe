"use client";
import React, { useState } from "react";
import { ScrollArea } from "@mantine/core";
import { articleslist, tag } from "@/components/ui/Items";
import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa6";
import Link from "next/link";

const Profile = () => {
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
        <div className="w-2/3 py-10 ">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-3xl font-medium">
              Heather McLeod in Human Parts
            </h2>
            <button className="btn btn-md btn-circle btn-ghost hover:bg-white">
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
          </div>
          <div className="flex justify-between items-center space-x-2 border-b px-2 sticky top-0 bg-base-100 z-10">
            <div className="menubar text-lg">
              <button className="btn btn-ghost px-4 text-lg font-normal hover:bg-white text-[#606060] hover:text-black">
                Home
              </button>
              <button className="btn btn-ghost px-4 text-lg font-normal hover:bg-white text-[#606060] hover:text-black">
                Ariticles
              </button>
              <button className="btn btn-ghost px-4 text-lg font-normal hover:bg-white text-[#606060] hover:text-black">
                Library
              </button>
              <button className="btn btn-ghost px-4 text-lg font-normal hover:bg-white text-[#606060] hover:text-black">
                Statistic
              </button>
            </div>
            <div className="pl-6">
              <label className="rounded-none border-b flex items-center gap-2">
                <input type="text" className="grow focus:outline-none" />
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
          </div>
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
        </div>
        {/* right */}
        <div className="w-2/6 py-12 pl-11 pr-2 ">
          <div className="flex flex-col items-center">
            <div className="profile text-center space-y-4 mb-12">
              <div className="avatar">
                <div className="w-28 rounded-full">
                  <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>
              </div>
              <h2 className="px-20">Heather McLeod in Human Parts</h2>
              <p className="text-[#606060]">45 Follows</p>
              <div className="social flex justify-center items-center space-x-3">
                <Link href="">
                  <FaGithub className="w-6 h-6" />
                </Link>
                <Link href="">
                  <FaFacebook className="w-6 h-6 text-[#1877F2]" />
                </Link>
                <Link href="">
                  <FaSquareXTwitter className="w-6 h-6" />
                </Link>
              </div>
              <button className="btn bg-black text-white rounded-full px-6 py-2">
                Edit
              </button>
            </div>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
