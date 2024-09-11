"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { articleProps } from "@/types/article/article";
import { getArticleTagsFromClient } from "@/libs/actions/tag/tag";
import { tagProps } from "@/types/tag/tag";
import { userProps } from "@/types/user/user";
import { getUserFromClient } from "@/libs/actions/user/userClient";
import InteractBtn from "@/app/(post)/[user]/[post_id]/component/InteractBtn";
import { getUserRole } from "@/libs/actions/user/user_role";
import { FaCircleCheck } from "react-icons/fa6";

type ArticleCardProps = {
  article: articleProps;
};

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const [users, setUsers] = useState<userProps | null>();
  const [tags, setTags] = useState<tagProps | null>();
  const [userRoles, setUserRoles] = useState<{ user_role_name: string }[] | null>(null);

  useEffect(() => {
    const fetchTagsAndUser = async () => {
      const { tag } = await getArticleTagsFromClient(article.article_id);
      setTags(tag);

      const userData = await getUserFromClient(article.user_id);
      setUsers(userData);

      if (userData) {
        const roles = await getUserRole(userData.user_id);
        setUserRoles(roles);
      }
    };
    fetchTagsAndUser();
  }, [article, article.article_id]);

  const userWithHyphen = users?.user_fullname.replace(/ /g, "-");
  const articleTitleWithHypen = article.article_title.replace(/ /g, "-");
  const firstArticleId = article.article_id.split("-")[0];
  const articleSlug = articleTitleWithHypen + "-" + firstArticleId;

  return (
    <div className="w-80 h-[22rem] flex flex-col space-y-1 mt-4">
      <div className="h-40 w-full mb-3">
        <Image
          src={article.article_cover}
          alt="test"
          className="w-full h-full  rounded-t-xl"
          height={160}
          width={320}
        />
      </div>
      <Link
        className="flex items-center space-x-2 px-2"
        href={`/profile/${users?.user_id}`}
      >
        <Image
          loading="lazy"
          width={20}
          height={20}
          alt={"User"}
          src={users?.user_profile || ""}
          className="w-5 h-5 rounded-full"
        />
        <h3 className="text-xs">{users?.user_fullname || "undefind"}</h3>
        {userRoles &&
          userRoles.some(role => role.user_role_name === "npru") && (
            <FaCircleCheck color="#952124" size={9} />
          )}
      </Link>
      <div className="px-2 w-full h-auto">
        <Link
          className="text-xl font-semibold line-clamp-2"
          href={`/${userWithHyphen}/${articleSlug}`}
        >
          {article.article_title}
        </Link>
      </div>
      <div className="px-2 h-10">
        <span className="text-[#606060] text-xs line-clamp-2">
          {article.article_description}
        </span>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex justify-between items-center">
          <div className="space-x-1 h-8 overflow-hidden w-full">
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
        </div>
        {article.user_id && (
          <div className="flex space-x-3 items-center justify-center">
            <InteractBtn
              user_id={article.user_id}
              article_id={article.article_id}
              username={users?.user_fullname || ""}
              articleTitle={article.article_title}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticleCard;
