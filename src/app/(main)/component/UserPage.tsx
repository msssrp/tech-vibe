"use client";
import React, { useState } from "react";

const articleslist = [
  {
    id: 1,
    title: "Ultimate ChatGPT cheatsheet for UX UI Designers: No Bullshit",
    description:
      "Lorem ipsum dolor sit amet consectetur. Consequat placerat vestibulum tempor amet tincidunt. Libero venenatis et at consequat quis nunc dignissim justo. Cras mollis volutpat amet odio sit...",
    image:
      "https://images.unsplash.com/photo-1587440871875-191322ee64b0?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    author: "Heather McLeod in Human Parts",
  },
  {
    id: 2,
    title: "Ultimate ChatGPT cheatsheet for UX UI Designers: No Bullshit",
    description:
      "Lorem ipsum dolor sit amet consectetur. Consequat placerat vestibulum tempor amet tincidunt. Libero venenatis et at consequat quis nunc dignissim justo. Cras mollis volutpat amet odio sit...",
    image:
      "https://images.unsplash.com/photo-1587440871875-191322ee64b0?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    author: "Heather McLeod in Human Parts",
  },
  {
    id: 3,
    title: "Ultimate ChatGPT cheatsheet for UX UI Designers: No Bullshit",
    description:
      "Lorem ipsum dolor sit amet consectetur. Consequat placerat vestibulum tempor amet tincidunt. Libero venenatis et at consequat quis nunc dignissim justo. Cras mollis volutpat amet odio sit...",
    image:
      "https://images.unsplash.com/photo-1587440871875-191322ee64b0?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    author: "Heather McLeod in Human Parts",
  },
  {
    id: 4,
    title: "maintain security",
    description:
      "Lorem ipsum dolor sit amet consectetur. Consequat placerat vestibulum tempor amet tincidunt. Libero venenatis et at consequat quis nunc dignissim justo. Cras mollis volutpat amet odio sit...",
    image:
      "https://images.unsplash.com/photo-1587440871875-191322ee64b0?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    author: "Heather McLeod in Human Parts",
  },
  {
    id: 5,
    title: "maintain security",
    description:
      "Lorem ipsum dolor sit amet consectetur. Consequat placerat vestibulum tempor amet tincidunt. Libero venenatis et at consequat quis nunc dignissim justo. Cras mollis volutpat amet odio sit...",
    image:
      "https://images.unsplash.com/photo-1587440871875-191322ee64b0?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    author: "Heather McLeod in Human Parts",
  },
  {
    id: 6,
    title: "maintain security",
    description:
      "Lorem ipsum dolor sit amet consectetur. Consequat placerat vestibulum tempor amet tincidunt. Libero venenatis et at consequat quis nunc dignissim justo. Cras mollis volutpat amet odio sit...",
    image:
      "https://images.unsplash.com/photo-1587440871875-191322ee64b0?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    author: "Heather McLeod in Human Parts",
  },
];
const tag = [
  { tag_id: 1, tag_name: "database", tag_color: "bg-pink-300" },
  { tag_id: 2, tag_name: "UX/UI", tag_color: "bg-yellow-400" },
  { tag_id: 3, tag_name: "Tester", tag_color: "bg-blue-400" },
  { tag_id: 4, tag_name: "Development", tag_color: "bg-green-400" },
  { tag_id: 5, tag_name: "Github", tag_color: "bg-yellow-400" },
  { tag_id: 6, tag_name: "PHP", tag_color: "bg-pink-300" },
  { tag_id: 7, tag_name: "C/C+", tag_color: "bg-yellow-400" },
  { tag_id: 8, tag_name: "Vite", tag_color: "bg-blue-400" },
];

const UserPage = () => {
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);

  const sliceArticleslist = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(
      startIndex + itemsPerPage,
      articleslist.length
    );
    return articleslist.slice(startIndex, endIndex);
  };
  return (
    <div className="container mx-auto ">
      <div className="flex divide-x">
        {/* left */}
        <div className="w-3/4 py-10 pr-11">
          <div className="flex items-center space-x-4 border-b ">
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
                  strokeWidth={0.5}
                  stroke="currentColor"
                  className="w-6 h-6"
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
                className="dropdown-content z-[1] menu p-4 shadow bg-base-100 rounded-box w-72 flex flex-row"
              >
                {tag.map((tag) => {
                  return (
                    <button
                      key={tag.tag_id}
                      className={`btn btn-sm badge ${tag.tag_color} text-white rounded-full `}
                    >
                      <p>{tag.tag_name}</p>
                    </button>
                  );
                })}
              </ul>
            </div>
            <div className="topic">
              <button className="btn btn-ghost  hover:bg-white text-[#606060] hover:text-black ">
                All articles
              </button>
            </div>
            <div className="topic">
              <button className="btn btn-ghost hover:bg-white text-[#606060] hover:text-black">
                Following
              </button>
            </div>
            <div className="selected-tag border-l pl-6 overflow-x-hidden">
              {tag.map((tag) => {
                return (
                  <button
                    key={tag.tag_id}
                    className={`btn btn-sm badge ${tag.tag_color} text-white rounded-full mr-[1px]`}
                  >
                    <p>{tag.tag_name}</p>
                  </button>
                );
              })}
            </div>
          </div>
          {/* allArticles */}
          <div className="space-y-2">
            {articleslist.map((articleslist) => {
              return (
                <div className="card card-side border-b rounded-none items-center ">
                  <div className="card-body pr-10">
                    <div className="avatar items-center">
                      <div className="w-8 rounded-full">
                        <img src={articleslist.image} />
                      </div>
                      <p className="ml-2 ">{articleslist.author}</p>
                    </div>
                    <h2 className="card-title text-2xl ">
                      {articleslist.title}
                    </h2>
                    <p className="line-clamp-2">
                      {articleslist.description}
                    </p>
                    <div className="flex items-center">
                      <div className="w-1/2 h-8 overflow-hidden space-x-1">
                        {tag.map((tag) => {
                          return (
                            <button
                              key={tag.tag_id}
                              className={`btn btn-sm badge ${tag.tag_color} text-white rounded-full `}
                            >
                              <p>{tag.tag_name}</p>
                            </button>
                          );
                        })}
                      </div>
                      <div className="w-1/2 flex justify-between items-center ">
                        <p>7 min read</p>
                        <div>
                          <button className="btn btn-circle btn-ghost hover:bg-white">
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
                          <button className="btn btn-circle btn-ghost hover:bg-white">
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
                          <button className="btn btn-circle btn-ghost hover:bg-white">
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
        </div>
        {/* right */}
        <div className="w-1/3 py-14 pl-11">
          <div className="flex items-center">
            <div className="grid grid-row-3">
              {/* popularArticles */}
              <div className="w-full space-y-1 mb-4">
                <h2 className="uppercase font-semibold text-lg">
                  Popular articles
                </h2>
                {sliceArticleslist().map((articleslist) => {
                  return (
                    <div className="card-compact bg-[#F8F8F8] rounded-md px-4 py-2">
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
                          <p>{articleslist.title}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div className="text-center">
                  <a href="#" className="underline cursor-pointer">
                    show more
                  </a>
                </div>
              </div>
              {/* npruArticles */}
              <div className="w-full space-y-1 mb-4">
                <h2 className="uppercase font-semibold text-lg">
                  Technology articles By NPRU
                </h2>
                {sliceArticleslist().map((articleslist) => {
                  return (
                    <div className="card-compact bg-[#F8F8F8] rounded-md px-4 py-2">
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
                          <p>{articleslist.title}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div className="text-center">
                  <a href="#" className="underline cursor-pointer">
                    show more
                  </a>
                </div>
              </div>
              {/* populartag */}
              <div className="w-full">
                <h2 className="uppercase font-semibold text-lg">
                  Popular tag
                </h2>
                <div className="mt-2 ">
                  {tag.map((tag) => {
                    return (
                      <button
                        key={tag.tag_id}
                        className={`btn btn-sm badge ${tag.tag_color} text-white rounded-full m-1`}
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
