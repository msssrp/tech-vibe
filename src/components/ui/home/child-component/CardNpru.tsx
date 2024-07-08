import React from "react";
import { articleProps } from "@/types/article/article";
import { getUser } from "@/libs/actions/user/user";
import Image from "next/image";
import Link from "next/link";

type NpruAarticlesProps = {
  npruAarticles: articleProps;
};

const CardNpru: React.FC<NpruAarticlesProps> = async ({ npruAarticles }) => {
  const user = await getUser(npruAarticles.user_id);
  const userWithHyphen = user.user_fullname.replace(/ /g, "-");
  const articleTitleWithHypen = npruAarticles.article_title.replace(/ /g, "-");
  const firstArticleId = npruAarticles.article_id.split("-")[0];
  const articleSlug = articleTitleWithHypen + "-" + firstArticleId;
  return (
    <div className="flex justify-center items-center mx-2 ">
      <div className="card card-compact w-64 bg-base-100 shadow-xl">
        <figure className="w-full h-36 m-0">
          <Image
            width={520}
            height={520}
            src={npruAarticles.article_cover}
            alt={npruAarticles.article_title}
            className="h-full"
            loading="lazy"
          />
        </figure>
        <div className="card-body">
          <Link
            href={`/${userWithHyphen}/${articleSlug}`}
            className="text-lg font-semibold line-clamp-2 cursor-pointer"
          >
            {npruAarticles.article_title}
          </Link>
          <p className="line-clamp-2 ">{npruAarticles.article_description}</p>
        </div>
      </div>
    </div>
  );
};

export default CardNpru;
