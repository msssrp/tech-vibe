import React from "react";
import Image from "next/image";
import { articleProps } from "@/types/article/article";
import { getUser } from "@/libs/actions/user/user";
import Link from "next/link";
import { getArticleTags } from "@/libs/actions/tag/tag";
import InteractBtn from "@/app/(post)/[user]/[post_id]/component/InteractBtn";
import { calculateReadingTime } from "@/libs/getReadingTimeOnArticle";
import { getUserRoleOnServer } from "@/libs/actions/user/user_role";
import { FaCircleCheck } from "react-icons/fa6";
import NpruVerify from "../ui/NpruVerify";
type AllArticlesProps = {
  article: articleProps;
  user_id?: string;
};

const AllArticleCard: React.FC<AllArticlesProps> = async ({
  article,
  user_id,
}) => {
  const user = await getUser(article.user_id);
  const tags = await getArticleTags(article.article_id);
  const userRole = await getUserRoleOnServer(user.user_id);
  const userWithHyphen = user.user_fullname
    .replace(/ /g, "-")
    .replace(/-$/, "");
  const articleTitleWithHypen = article.article_title
    .replace(/ /g, "-")
    .replace(/\//, "&");
  const firstArticleId = article.article_id.split("-")[0];
  const articleSlug = articleTitleWithHypen + "-" + firstArticleId;
  const timeToRead = calculateReadingTime(article.article_content);
  return (
    <div className="flex flex-col md:flex-row space-x-0 md:space-x-3 border-b mt-5 rounded-none items-center h-auto pb-5">
      <div className="flex flex-col mt-5 space-y-2 px-4 md:w-3/4 w-full h-full">
        <div className="flex flex-col max-h-32 ">
          <Link
            href={`/profile/${user.user_id}`}
            className="avatar items-center h-1/3 space-x-1"
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
            {userRole &&
              userRole.some((user) => user.user_role_name === "npru") && (
                <NpruVerify />
              )}
          </Link>
        </div>
        <div className="flex flex-col">
          <Link
            id="title-article"
            href={`/${userWithHyphen}/${articleSlug}`}
            className="card-title text-xl flex-1"
          >
            {article.article_title}
          </Link>
          <p className="line-clamp-2 text-sm text-[#616160]">
            {article.article_description}
          </p>
        </div>

        <div className="flex justify-between items-center mt-3">
          <div className="space-x-1 w-2/5 h-8 overflow-hidden md:w-full">
            {tags &&
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
          <div className="flex justify-between items-center w-2/3">
            <div>
              <p className="text-xs">
                {timeToRead} {timeToRead <= 1 ? "min " : "mins "}read
              </p>
            </div>
            {user_id && (
              <div className="flex space-x-3 items-center justify-center">
                <InteractBtn
                  user_id={user_id}
                  article_id={article.article_id}
                  username={user.user_fullname}
                  articleTitle={article.article_title}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex-1 h-1/2 w-full mt-3 md:mt-0 md:flex-none md:w-36 md:h-20">
        <Image
          width={450}
          height={450}
          src={article.article_cover}
          alt={article.article_title}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default AllArticleCard;
