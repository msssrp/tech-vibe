"use client";
import LibraryDropdown from "@/components/ui/LibraryDropdown";
import { getArticleCoverByArticleId } from "@/libs/actions/article/article";
import { getSavedArticleByReadlistId } from "@/libs/actions/savedArticle/savedArticle";
import { readlistsProps } from "@/types/readlists/readlists";
import { savedArticleProps } from "@/types/savedArticles/savedArticles";
import { userProps } from "@/types/user/user";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type savedArticleCardProps = {
  user: userProps;
  readlist: readlistsProps;
};

const SavedArticleCard: React.FC<savedArticleCardProps> = ({
  user,
  readlist,
}) => {
  const [savedArticles, setSavedArticles] = useState<savedArticleProps[]>([]);
  const [articleCover, setArticleCover] = useState("");
  useEffect(() => {
    const getSavedArticles = async () => {
      const savedArticles = await getSavedArticleByReadlistId(
        readlist.readlists_id
      );
      if (savedArticles) {
        const savedArticleId = savedArticles.find((item) => item.article_id);
        if (savedArticleId) {
          const articleCover = await getArticleCoverByArticleId(
            savedArticleId.article_id
          );
          setArticleCover(articleCover);
        }
        return setSavedArticles(savedArticles);
      }
    };
    getSavedArticles();
  }, [readlist.readlists_id]);

  return (
    <div className="card card-side rounded-none items-center my-8 px-3 sm:px-4 bg-base-200">
      <div className="card-body px-2 sm:px-4 sm:space-y-4">
        <div className="flex items-center justify-between">
          <Link
            href={`/profile/${user.user_id}/library/${readlist.readlists_id}`}
            className="flex items-center space-x-4"
          >
            <h2 className="card-title text-2xl ">{readlist.readlists_name}</h2>
          </Link>
          <LibraryDropdown readlistName={readlist.readlists_name} readlistId={readlist.readlists_id}/>
        </div>

        <div className="flex items-center space-x-9">
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
          <div>
            <ul className="list-disc flex space-x-1 ">
              <li>{savedArticles.length} lists</li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                />
              </svg>
            </ul>
          </div>
        </div>
      </div>
      <div className="hidden sm:flex">
        {articleCover ? (
          <Image
            height={200}
            width={200}
            src={articleCover}
            alt="Picture"
            className="w-40"
          />
        ) : (
          <span className="text-sm italic line-clamp-2">
            you didnt add any article on this read list yet.
          </span>
        )}
      </div>
    </div>
  );
};

export default SavedArticleCard;
