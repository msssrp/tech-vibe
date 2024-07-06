"use client";
import { articleProps } from "@/types/article/article";
import Image from "next/image";
import Link from "next/link";
import React from "react";

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
            articles.slice(0,4).map((articleslist) => {
              return (
                <Link href="/SignIn" key={articleslist.article_id}>
                  <h2 className="card-title font-normal line-clamp-1 pr-6 mb-2 sm:md-6">
                    {articleslist.article_title}
                  </h2>
                  <div className="card card-side bg-base-100 drop-shadow-sm border rounded-md">
                    <figure className="h-44 sm:h-40 md:h-56 w-96 ">
                      <Image
                        src={articleslist.article_cover}
                        alt={articleslist.article_title}
                        width={520}
                        height={520}
                        className="object-cover h-full"
                        loading="lazy"
                      />
                    </figure>
                    <div className="text-sm py-2 px-2 md:px-3 lg:px-4 xl:px-6 w-96 md:w-4/5 flex justify-center items-center">
                      <p className="text-center line-clamp-4">
                        {articleslist.article_description}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default NewArticles;
