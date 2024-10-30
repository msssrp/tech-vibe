import React from "react";
import { articleProps } from "@/types/article/article";
import { getUser } from "@/libs/actions/user/user";
import { getArticleTags } from "@/libs/actions/tag/tag";
import Image from "next/image";
import Link from "next/link";

type popularArticlesProps = {
  popularArticles: articleProps;
};

const CardPopular: React.FC<popularArticlesProps> = async ({
  popularArticles,
}) => {
  const user = await getUser(popularArticles.user_id);
  const tags = await getArticleTags(popularArticles.article_id);
  const userWithHyphen = user.user_fullname.replace(/ /g, "-");
  const articleTitleWithHypen = popularArticles.article_title.replace(
    / /g,
    "-"
  );
  const firstArticleId = popularArticles.article_id.split("-")[0];
  const articleSlug = articleTitleWithHypen + "-" + firstArticleId;
  const renderTags = () => {
    // @ts-ignore
    return tags?.tag_name.map((tag: any, index: number) => {
      return (
        <div key={index} className="btn btn-sm badge bg-[#F2F2F2] rounded-full">
          <p className="font-thin m-0">{tag}</p>
        </div>
      );
    });
  };
  return (
    <div className="flex justify-center ">
      <div className="card card-compact w-80 sm:w-[30rem] bg-base-100 drop-shadow-sm rounded-t-[50px] rounded-md border">
        <figure className="w-full h-44 m-0">
          <Image
            width={520}
            height={520}
            src={popularArticles.article_cover}
            alt="Article"
            className="object-cover"
          />
        </figure>
        <div className="card-body">
          <span className="space-x-1 line-clamp-1">{renderTags()}</span>
          <Link
            href={`/${userWithHyphen}/${articleSlug}`}
            className="card-title cursor-pointer line-clamp-2"
          >
            {popularArticles.article_title}
          </Link>
          <p className="line-clamp-2 m-0">
            {popularArticles.article_description}
          </p>
          <div className="flex justify-between items-center mt-2">
            <div className="avatar items-center">
              <div className="w-8 rounded-full">
                <Image
                  width={32}
                  height={32}
                  src={user.user_profile}
                  alt={user.user_fullname}
                />
              </div>
              <p className="ml-2 my-0">{user.user_fullname}</p>
            </div>
            <a className="cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6 stroke-blue-500"
              >
                <path d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardPopular;
