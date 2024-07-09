import { articleProps } from "@/types/article/article";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { getUser } from "@/libs/actions/user/user";
import CardNew from "./child-component/CardNew";

type newArticlesProps = {
  articles: articleProps[] | undefined;
};

const NewArticles: React.FC<newArticlesProps> = ({ articles }) => {
  return (
    <div className="container mx-auto">
      <div className="py-10">
        <div className="sm:ml-5 lg:ml-20 ">
          <h2 className="text-3xl sm:text-4xl text-center sm:text-left">
            New articles
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8 px-6 sm:px-16 md:px-20 lg:px-44">
          {articles &&
            articles.slice(0, 4).map((articleslist) => {
              return (
                <CardNew
                  newArticles={articleslist}
                  key={articleslist.article_id}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default NewArticles;
