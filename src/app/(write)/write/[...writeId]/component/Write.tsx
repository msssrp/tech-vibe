"use client";
import React from "react";
import TinyEditor from "./TinyEditor";
import WriteNavbar from "@/components/main/WriteNavbar";
import { WriteProps } from "@/types/article/article";
import { useEditorStore } from "@/store/article";

const Write: React.FC<WriteProps> = ({ user, writeId }) => {
  const { article, updateArticle } = useEditorStore((state) => ({
    updateArticle: state.updateArticle,
    article: state.article,
  }));

  const handlerOnchangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateArticle({ ...article, article_title: e.target.value });
  };
  const handlerOnchangeDesc = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateArticle({ ...article, article_description: e.target.value });
  };
  return (
    <div>
      <WriteNavbar user={user} />
      <div className="container mx-auto px-32 py-10">
        <div className="flex items-center justify-center mt-10 divide-x">
          <div className="pr-2">
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={0.5}
                stroke="#9A9A9B"
                className="w-12 h-12">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </button>
          </div>
          <div className="w-full pl-4">
            <div className="flex flex-col">
              <input
                onChange={(e) => handlerOnchangeTitle(e)}
                type="text"
                placeholder="Title"
                className="input input-lg w-full focus:outline-none focus:border-none px-0 text-4xl font-semibold capitalize"
              />
              <input
                onChange={(e) => handlerOnchangeDesc(e)}
                type="text"
                placeholder="description"
                className="input input-md  w-full focus:outline-none focus:border-none px-0 text-xl font-light"
              />
            </div>
          </div>
        </div>
        <div className="mt-8">
          <TinyEditor
            writeId={writeId}
            title={article.article_title}
            description={article.article_description}
            user_id={user.user_id}
          />
        </div>
      </div>
    </div>
  );
};

export default Write;
