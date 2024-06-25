"use client";
import { getArticleTagsOnClient } from "@/libs/actions/tag/tag";
import { ConvertUrlToSlug } from "@/libs/urlConvert";
import { articleProps } from "@/types/article/article";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ApproveBtn from "./ApproveBtn";
import { userProps } from "@/types/user/user";
import { getUserFromClient } from "@/libs/actions/user/userClient";

type ArticleApproveCardProps = {
  article: articleProps;
};

const ArticleApproveCard: React.FC<ArticleApproveCardProps> = ({ article }) => {
  const [user, setUser] = useState<userProps>();
  const [tags, setTags] = useState<any>();
  useEffect(() => {
    const fetchData = async () => {
      const user = await getUserFromClient(article.user_id);
      const tags = await getArticleTagsOnClient(article.article_id);
      setUser(user);
      setTags(tags);
    };
    fetchData();
  }, [article.article_id, article.user_id]);
  const slugUrl = ConvertUrlToSlug(article.article_title);
  if (!user) return;
  return (
    <div className="w-full lg:w-2/6 mr-7 bg-white mt-6 rounded-lg flex flex-col">
      <div className="flex space-x-3 rounded-none items-center h-auto pb-2 p-4">
        <div className="flex flex-col  space-y-3 px-4 w-3/4 h-full">
          <div className="flex flex-col max-h-32 ">
            <Link
              href={`/profile/${user.user_id}`}
              className="avatar items-center h-1/3"
            >
              <div className="w-8 rounded-full">
                <Image
                  loading="lazy"
                  width={52}
                  height={52}
                  alt={"User"}
                  src={user.user_profile}
                />
              </div>
              <p className="ml-2">{user.user_fullname}</p>
            </Link>
            <Link
              href={`/post/${ConvertUrlToSlug(slugUrl)}`}
              className="card-title text-xl flex-1 mt-3"
            >
              {article.article_title}
            </Link>
          </div>

          <p className="line-clamp-2 text-[#616160]">
            {article.article_description}
          </p>

          <div className="flex justify-between items-center mt-3">
            <div className="space-x-1 h-8 overflow-hidden w-full">
              {tags &&
                tags.tag_name.map((tag: any, index: number) => {
                  return (
                    <button
                      key={index}
                      className={`btn btn-sm badge bg-[#F2F2F2] rounded-full `}
                    >
                      <p className="font-thin">{tag}</p>
                    </button>
                  );
                })}
            </div>
            <div className="flex justify-between items-center w-2/3">
              <div>
                <p className="text-sm">7 min read</p>
              </div>
            </div>
          </div>
        </div>
        <div className="border flex-1 h-1/2">
          <Image
            width={450}
            height={450}
            src={article.article_cover}
            alt={article.article_title}
            loading="lazy"
            className="w-full h-full"
          />
        </div>
      </div>
      {article && article.article_status !== "public" && (
        <ApproveBtn
          articleId={article.article_id}
          articleTitle={article.article_title}
          userId={user.user_id}
        />
      )}
    </div>
  );
};

export default ArticleApproveCard;
