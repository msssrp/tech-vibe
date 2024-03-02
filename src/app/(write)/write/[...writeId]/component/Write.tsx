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
