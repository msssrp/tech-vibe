import React from "react";
import Image from "next/image";
import { articleProps } from "@/types/article/article";
import { getUser } from "@/libs/actions/user/user";
import Link from "next/link";
import { ConvertUrlToSlug } from "@/libs/urlConvert";
import { getArticleTags } from "@/libs/actions/tag/tag";
import InteractBtn from "@/app/(post)/post/[postName]/component/InteractBtn";
type AllArticlesProps = {
  article: articleProps;
  user_id: string;
};

const AllArticleCard: React.FC<AllArticlesProps> = async ({
  article,
  user_id,
}) => {
  const user = await getUser(article.user_id);
  const slugUrl = ConvertUrlToSlug(article.article_title);
  const tags = await getArticleTags(article.article_id);

  return (
    <div className="flex space-x-3 border-b mt-5 rounded-none items-center h-auto pb-5">
      <div className="flex flex-col mt-5 space-y-3 px-4 w-3/4 h-full">
        <div className="flex flex-col max-h-32 ">
          <div className="avatar items-center h-1/3">
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
          </div>
          <Link
            href={`/post/${ConvertUrlToSlug(slugUrl)}`}
            className="card-title text-2xl flex-1 mt-3">
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
                    className={`btn btn-sm badge bg-[#F2F2F2] rounded-full `}>
                    <p className="font-thin">{tag}</p>
                  </button>
                );
              })}
          </div>
          <div className="flex justify-between items-center w-2/3">
            <div>
              <p className="text-sm">7 min read</p>
            </div>
            <div className="flex space-x-3 items-center justify-center">
              <InteractBtn
                user_id={user_id}
                article_id={article.article_id}
                url_title={`${article.article_title}`}
              />
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
  );
};

export default AllArticleCard;
