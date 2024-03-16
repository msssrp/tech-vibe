import React from "react";
import { articleTestLists, tag } from "../ui/Items";
import Image from "next/image";

const AllArticleCard: React.FC<articleTestLists> = ({ article }) => {
  return (
    <div className="card card-side border-b rounded-none items-center ">
      <div className="card-body px-4">
        <div className="avatar items-center">
          <div className="w-8 rounded-full">
            <Image
              loading="lazy"
              width={52}
              height={52}
              alt={article.title}
              src={article.image}
            />
          </div>
          <p className="ml-2">{article.author}</p>
        </div>
        <h2 className="card-title text-2xl mt-3">{article.title}</h2>
        <p className="line-clamp-2 ">{article.description}</p>
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
      <div className="w-96">
        <Image
          width={450}
          height={450}
          src={article.image}
          alt={article.title}
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default AllArticleCard;
