import { articleProps } from "@/types/article/article";
import { getArticleTagsFromClient } from "@/libs/actions/tag/tag";
import { tagProps } from "@/types/tag/tag";
import { userProps } from "@/types/user/user";
import Image from "next/image";
import React from "react";
import CardPopular from "./child-component/CardPopular";

type popularArticlesProps = {
  popularArticles: articleProps[] | undefined;
};

const PopularArticles: React.FC<popularArticlesProps> = ({
  popularArticles,
}) => {
  return (
    <div className="container mx-auto">
      <div className="sm:mt-8 py-10">
        <div className="sm:ml-5 lg:ml-20">
          <h2 className="text-3xl sm:text-4xl text-center sm:text-left">
            Popular articles
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-6 sm:px-12 lg:px-40 xl:px-72 drop-shadow-md">
          {popularArticles &&
            popularArticles.slice(0,4).map((articleslist) => {
              return (
                <CardPopular
                  popularArticles={articleslist}
                  key={articleslist.article_id}
                />
              );
            })}
        </div>

        <div className="text-center mt-8">
          {/* {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={`mr-2 w-12 h-[5px] rounded-full ${
                index + 1 === currentPage ? "bg-red" : "bg-[#C8C2C2]"
              }`}
              onClick={() => setCurrentPage(index + 1)}
            ></button>
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default PopularArticles;
