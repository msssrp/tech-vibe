import NpruVerify from "@/components/ui/NpruVerify";
import { getUser } from "@/libs/actions/user/user";
import { getUserRoleOnServer } from "@/libs/actions/user/user_role";
import { articleProps } from "@/types/article/article";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type rightArticleCard = {
  article: articleProps;
};

const RightArticleCard: React.FC<rightArticleCard> = async ({ article }) => {
  const user = await getUser(article.user_id);
  const userRole = await getUserRoleOnServer(user.user_id);
  const userWithHyphen = user.user_fullname.replace(/ /g, "-");
  const articleTitleWithHypen = article.article_title.replace(/ /g, "-");
  const firstArticleId = article.article_id.split("-")[0];
  const articleSlug = articleTitleWithHypen + "-" + firstArticleId;
  return (
    <div className="card-compact bg-[#F8F8F8] rounded-md px-4 ">
      <div className="flex flex-col py-3 px-2 space-y-2">
        <Link
          className="flex items-center space-x-2"
          href={`/profile/${user.user_id}`}
        >
          <div className="w-8">
            <Image
              alt={article.article_title}
              src={user.user_profile}
              height={32}
              width={32}
              className="w-full rounded-full"
            />
          </div>
          <p className="text-sm text-[#606060]">{user.user_fullname}</p>

          {userRole &&
            userRole.some((user) => user.user_role_name === "npru") && (
              <NpruVerify />
            )}
        </Link>
        <Link
          className="card-title line-clamp-2"
          href={`/${userWithHyphen}/${articleSlug}`}
        >
          <p className="font-semibold text-sm">{article.article_title}</p>
        </Link>
      </div>
    </div>
  );
};

export default RightArticleCard;
