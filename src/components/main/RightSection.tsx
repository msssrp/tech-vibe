"use client";
import Image from "next/image";
import React, { useState } from "react";
import { tag } from "../ui/Items";

type RightSectionProps = {
  articleslist: any;
};

const RightSection: React.FC<RightSectionProps> = ({ articleslist }) => {
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const sliceArticleslist = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, articleslist.length);
    return articleslist.slice(startIndex, endIndex);
  };
  return (
    <div className="w-2/6 py-12 pl-11 pr-2 flex flex-col items-center relative">
      {/* popularArticles */}
      <div className="w-full space-y-3 mb-6 ">
        <h2 className="uppercase font-semibold text-lg">Popular articles</h2>
        {sliceArticleslist().map((articleslist: any) => {
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
                  <p className="ml-2 text-[#606060]">{articleslist.author}</p>
                </div>
                <div className="card-title line-clamp-2">
                  <p className="font-normal text-base">{articleslist.title}</p>
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
      <div className="w-full space-y-3 mt-3 mb-6 sticky top-14">
        <h2 className="uppercase font-semibold text-lg">
          Technology articles By NPRU
        </h2>
        {sliceArticleslist().map((articleslist: any) => {
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
                        className="w-4 h-4">
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
                  <p className="font-normal text-base">{articleslist.title}</p>
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
  );
};

export default RightSection;
