import React from "react";
import { articleProps } from "@/types/article/article";
import { getUser } from "@/libs/actions/user/user";
import Image from "next/image";
import Link from "next/link";

type newArticlesProps = {
  newArticles: articleProps;
};

const CardNew: React.FC<newArticlesProps> = async ({ newArticles }) => {
  const user = await getUser(newArticles.user_id);
  const userWithHyphen = user.user_fullname.replace(/ /g, "-");
  const articleTitleWithHypen = newArticles.article_title.replace(/ /g, "-");
  const firstArticleId = newArticles.article_id.split("-")[0];
  const articleSlug = articleTitleWithHypen + "-" + firstArticleId;
  return (
    <div>
      <Link href={`/${userWithHyphen}/${articleSlug}`} className="card-title font-normal line-clamp-1 pr-6 mb-2 sm:md-6">
        {newArticles.article_title}
      </Link>
      <div className="card card-side bg-base-100 drop-shadow-sm border rounded-md">
        <figure className="h-44 sm:h-40 md:h-44 w-96 m-0">
          <Image
            src={newArticles.article_cover}
            alt={newArticles.article_title}
            width={520}
            height={520}
            className="object-cover h-full"
            loading="lazy"
          />
        </figure>
        <div className="text-sm py-2 px-2 md:px-3 lg:px-4 xl:px-6 w-96 md:w-4/5 flex justify-center items-center">
          <p className="text-center line-clamp-4">
            {newArticles.article_description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardNew;
