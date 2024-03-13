"use client";
import { DownsArticle, UpsArticle } from "@/libs/actions/article/articleStat";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type UpDownsButtonProps = {
  articleUp: any | null;
  user_id: string | undefined;
  article_id: string;
  userUp: number | null;
  userDown: number | null;
};

const UpDownsButton: React.FC<UpDownsButtonProps> = ({
  articleUp,
  article_id,
  user_id,
  userUp,
  userDown,
}) => {
  console.log(articleUp);

  const router = useRouter();
  const onUpClick = async () => {
    if (user_id) {
      await UpsArticle(article_id, user_id, false);
      await DownsArticle(article_id, user_id, true);
      router.refresh();
    }
  };
  const onCancelUp = async () => {
    if (user_id) {
      await UpsArticle(article_id, user_id, true);
      router.refresh();
    }
  };

  const onDownClick = async () => {
    if (user_id) {
      await DownsArticle(article_id, user_id, false);
      await UpsArticle(article_id, user_id, true);
      router.refresh();
    }
  };
  const onDownCancel = async () => {
    if (user_id) {
      await DownsArticle(article_id, user_id, true);
      router.refresh();
    }
  };
  return (
    <>
      <div className="flex space-x-2">
        {userUp && userUp == 1 ? (
          <button onClick={onCancelUp}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="white"
              className="w-6 h-6">
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm.53 5.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72v5.69a.75.75 0 0 0 1.5 0v-5.69l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        ) : (
          <button onClick={onUpClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#616160"
              className="w-6 h-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m15 11.25-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </button>
        )}

        <p className="text-[#616160]">{articleUp}</p>
      </div>

      {userDown && userDown == 1 ? (
        <button onClick={onDownCancel}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="white"
            className="w-6 h-6">
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-.53 14.03a.75.75 0 0 0 1.06 0l3-3a.75.75 0 1 0-1.06-1.06l-1.72 1.72V8.25a.75.75 0 0 0-1.5 0v5.69l-1.72-1.72a.75.75 0 0 0-1.06 1.06l3 3Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      ) : (
        <button onClick={onDownClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#616160"
            className="w-6 h-6">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m9 12.75 3 3m0 0 3-3m-3 3v-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </button>
      )}
    </>
  );
};

export default UpDownsButton;
