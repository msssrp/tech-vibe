"use client";
import InteractBtn from "@/app/(main)/(post)/[user]/[post_id]/component/InteractBtn";
import { getArticleTagsFromClient } from "@/libs/actions/tag/tag";
import { calculateReadingTime } from "@/libs/getReadingTimeOnArticle";
import { articleProps } from "@/types/article/article";
import { tagProps } from "@/types/tag/tag";
import { userProps } from "@/types/user/user";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import NpruVerify from "../ui/NpruVerify";

type allArticleCardClientProps = {
  user: userProps | undefined;
  article: articleProps;
  userId?: string;
  articleId: string;
  interactBtn?: boolean;
  userRole:
    | {
        user_role_name: string;
      }[]
    | null
    | undefined;
  isDraft?: boolean;
};

const AllArticleCardClient: React.FC<allArticleCardClientProps> = ({
  user,
  article,
  userId,
  articleId,
  interactBtn,
  userRole,
  isDraft,
}) => {
  const [tags, setTags] = useState<tagProps | null>();
  useEffect(() => {
    const fetchTagsAndUserRole = async () => {
      const { tag } = await getArticleTagsFromClient(articleId);
      setTags(tag);
    };
    fetchTagsAndUserRole();
  }, [article, user, articleId, userId]);
  const userWithHyphen = user?.user_fullname.replace(/ /g, "-");
  const articleTitleWithHypen = article.article_title.replace(/ /g, "-");
  const firstArticleId = article.article_id.split("-")[0];
  const articleSlug = articleTitleWithHypen + "-" + firstArticleId;
  const timeToRead = calculateReadingTime(article.article_content);
  return (
    <div className="flex flex-col md:flex-row space-x-0 md:space-x-3 border-b mt-5 rounded-none items-center h-auto pb-5">
      <div className="flex flex-col mt-5 space-y-6 sm:space-y-2 px-4 md:w-3/4 w-full h-full">
        <div className="flex flex-col max-h-32 space-y-2">
          <div className="avatar items-center h-1/3 space-x-1">
            <div className="w-8 rounded-full">
              <Image
                loading="lazy"
                width={52}
                height={52}
                alt={"User"}
                src={user ? user.user_profile : ""}
              />
            </div>
            <p className="ml-2">{user ? user.user_fullname : "undefind"}</p>
            {userRole &&
              userRole.some((user) => user.user_role_name === "npru") && (
                <NpruVerify />
              )}
          </div>
          <div className="flex flex-col space-y-2">
            {isDraft ? (
              <Link
                href={`/edit/${article.article_id}`}
                className="card-title text-2xl flex-1 mt-3"
              >
                {article.article_title}
              </Link>
            ) : (
              <Link
                id="title-article"
                href={`/${userWithHyphen}/${articleSlug}`}
                className="card-title text-xl flex-1"
              >
                {article.article_title}
              </Link>
            )}
            <p className="line-clamp-2 text-sm text-[#616160]">
              {article.article_description}
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center mt-3">
          <div className="space-x-1 w-2/5 h-8 overflow-hidden md:w-full">
            {tags &&
              tags.tag_name &&
              tags.tag_name.map((tag: string, index: number) => {
                const tagWithHypen = tag.replace(/ /g, "-");
                return (
                  <Link
                    href={`/category/${tagWithHypen}`}
                    key={index}
                    className={`btn btn-sm badge bg-[#F2F2F2] rounded-full `}
                  >
                    <p className="font-thin">{tag}</p>
                  </Link>
                );
              })}
          </div>
          {!isDraft && (
            <div className="flex justify-end sm:justify-between items-center w-2/3 space-x-2 sm:space-x-0">
              <div>
                <p className="text-xs ">
                  {timeToRead} {timeToRead <= 1 ? "min " : "mins "} read
                </p>
              </div>
              <div className="flex space-x-3 items-center justify-center">
                {interactBtn && user && article.article_status === "public" && (
                  <InteractBtn
                    user_id={userId}
                    article_id={article.article_id}
                    articleTitle={article.article_title}
                    username={user.user_fullname}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-center items-center sm:flex-1 h-1/2 w-full mt-3 md:mt-0 md:flex-none md:w-36 md:h-20">
        {isDraft ? (
          <Link
            href={`/edit/${article.article_id}`}
            className="card-title text-2xl flex-1 mt-3"
          >
            <Image
              width={450}
              height={450}
              src={article.article_cover}
              alt={article.article_title}
              loading="lazy"
              className="w-60 sm:w-full sm:h-full object-cover px-4 sm:px-0"
            />
          </Link>
        ) : (
          <Image
            width={450}
            height={450}
            src={article.article_cover}
            alt={article.article_title}
            loading="lazy"
            className="w-60 sm:w-full sm:h-full object-cover px-4 sm:px-0"
          />
        )}
      </div>
    </div>
  );
};

export default AllArticleCardClient;
