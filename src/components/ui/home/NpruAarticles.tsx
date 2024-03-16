"use client";
import Image from "next/image";
import React, { useState } from "react";

const articleslist = [
  {
    id: 1,
    title: "Ultimate ChatGPT cheatsheet for UX UI Designers: No Bullshit",
    description:
      "AI won’t replace designers, but designers who use AI will replace those who don’t. Similar to how....",
    image:
      "https://images.unsplash.com/photo-1587440871875-191322ee64b0?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    author: "Heather McLeod in Human Parts",
  },
  {
    id: 2,
    title: "Ultimate ChatGPT cheatsheet for UX UI Designers: No Bullshit",
    description:
      "AI won’t replace designers, but designers who use AI will replace those who don’t. Similar to how....",
    image:
      "https://images.unsplash.com/photo-1587440871875-191322ee64b0?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    author: "Heather McLeod in Human Parts",
  },
  {
    id: 3,
    title: "Ultimate ChatGPT cheatsheet for UX UI Designers: No Bullshit",
    description:
      "AI won’t replace designers, but designers who use AI will replace those who don’t. Similar to how....",
    image:
      "https://images.unsplash.com/photo-1587440871875-191322ee64b0?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    author: "Heather McLeod in Human Parts",
  },
  {
    id: 4,
    title: "maintain security",
    description:
      "AI won’t replace designers, but designers who use AI will replace those who don’t. Similar to how....",
    image:
      "https://images.unsplash.com/photo-1587440871875-191322ee64b0?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    author: "Heather McLeod in Human Parts",
  },
  {
    id: 5,
    title: "maintain security",
    description:
      "AI won’t replace designers, but designers who use AI will replace those who don’t. Similar to how....",
    image:
      "https://images.unsplash.com/photo-1587440871875-191322ee64b0?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    author: "Heather McLeod in Human Parts",
  },
  {
    id: 6,
    title: "maintain security",
    description:
      "AI won’t replace designers, but designers who use AI will replace those who don’t. Similar to how....",
    image:
      "https://images.unsplash.com/photo-1587440871875-191322ee64b0?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    author: "Heather McLeod in Human Parts",
  },
];
const NpruAarticles = () => {
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);

  const sliceArticleslist = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, articleslist.length);
    return articleslist.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(articleslist.length / itemsPerPage);

  return (
    <div className="bg-red text-center py-10 sm:py-14">
      <div className="flex flex-col justify-center items-center text-white space-y-2 sm:space-y-5">
        <h2 className="uppercase text-xl sm:text-4xl font-semibold ">
          Technology articles By NPRU
        </h2>
        <p className="w-full text-sm px-5 sm:px-16 sm:text-base ">
          Articles about technology and IT that come from authors from Nakhon
          Pathom Rajabhat University that will be useful for you
        </p>
      </div>
      <div className="flex justify-center mt-6 sm:mt-8 relative px-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 sm:mx-5 gap-2 space-y-5 sm:space-y-0 ">
          {sliceArticleslist().map((articleslist) => {
            return (
              <div
                key={articleslist.id}
                className="flex justify-center items-center mx-2 cursor-pointer ">
                <div className="card card-compact w-64 bg-base-100 shadow-xl">
                  <figure>
                    <Image
                      width={200}
                      height={200}
                      src={articleslist.image}
                      alt={articleslist.title}
                      className="h-full w-full"
                      loading="lazy"
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="text-lg font-semibold line-clamp-2">
                      {articleslist.title}
                    </h2>
                    <p className="line-clamp-2 ">{articleslist.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="absolute inset-y-0 items-center hidden lg:flex justify-center container mx-auto">
          <div className="absolute -right-10 lg:right-0 xl:right-28 2xl:right-56">
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              className="px-1 sm:px-2 rounded-full text-white"
              disabled={
                currentPage === Math.ceil(articleslist.length / itemsPerPage)
              }>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-16 h-16">
                <path d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" />
              </svg>
            </button>{" "}
          </div>
          <div className="absolute -left-10 lg:left-0 xl:left-28 2xl:left-56">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              className="px-1 sm:px-2 rounded-full text-white "
              disabled={currentPage === 1}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-16 h-16">
                <path d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-8 space-x-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`w-12 h-[5px] rounded-full duration-100 ${
              index + 1 === currentPage
                ? "bg-[#FFFFFF]"
                : "bg-[#C8C2C2] opacity-60"
            }`}
            onClick={() => setCurrentPage(index + 1)}></button>
        ))}
      </div>
    </div>
  );
};

export default NpruAarticles;
