import { userProps } from "@/types/user/user";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type articleCardProps = {
  user: userProps;
  cardTitle: string;
  articleStatus: string;
  articleTotal: number;
  articleCover: string | undefined;
};

const ArticleCard: React.FC<articleCardProps> = ({
  user,
  cardTitle,
  articleStatus,
  articleTotal,
  articleCover,
}) => {
  return (
    <Link
      href={`/profile/${user.user_id}/${
        articleStatus === "Publish"
          ? "published-articles"
          : articleStatus === "Pending"
          ? "pending-articles"
          : articleStatus === "Draft"
          ? "drafted-articles"
          : "hidden-articles"
      }`}
      className="card card-side rounded-none items-center my-8 px-3 sm:px-4 bg-base-200"
    >
      <div className="card-body px-2 sm:px-4 sm:space-y-4">
        <div className="flex flex-row items-center sm:space-x-4">
          <h2 className="card-title md:text-xl 2xl:text-2xl">
            {cardTitle} articles
          </h2>
          <div
            className={`badge ${
              articleStatus === "Publish"
                ? "bg-[#4ECB71]"
                : articleStatus === "Pending"
                ? "bg-[#FFD556]"
                : articleStatus === "Draft"
                ? "bg-[#606060]"
                : "bg-[#FF9A62]"
            } text-white py-4 px-4`}
          >
            {articleStatus}
          </div>
        </div>
        <div className="flex items-center">
          <div className="avatar items-center">
            <div className="w-8 rounded-full">
              <Image
                width={50}
                height={50}
                src={user.user_profile}
                alt="user Profile"
              />
            </div>
            <p className="ml-2 line-clamp-1">{user.user_fullname}</p>
          </div>
          <div className="sm:ml-11">
            <ul className="list-disc">
              <li className="text-sm">
                {articleTotal} {articleTotal > 1 ? "articles" : "article"}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div>
        {articleTotal !== 0 ? (
          <Image
            height={200}
            width={200}
            src={
              articleCover
                ? articleCover
                : "/public/images/home/tags/coding.png"
            }
            alt="Picture"
            className="w-40"
          />
        ) : (
          <span className="text-sm italic line-clamp-2">
            You dont have any article on this status.
          </span>
        )}
      </div>
    </Link>
  );
};

export default ArticleCard;
