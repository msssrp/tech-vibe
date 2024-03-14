"use client";
import { DownsArticle, UpsArticle } from "@/libs/actions/article/articleStat";
import React, { useEffect, useState } from "react";

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
  const [hasUpvoted, setHasUpvoted] = useState<boolean>(userUp === 1);
  const [hasDownvoted, setHasDownvoted] = useState<boolean>(userDown === 1);

  useEffect(() => {
    setHasUpvoted(userUp === 1);
    setHasDownvoted(userDown === 1);
  }, [userUp, userDown]);

  const onUpClick = async () => {
    if (user_id) {
      if (hasUpvoted) {
        setHasUpvoted(false);
        await UpsArticle(article_id, user_id, true);
      } else {
        setHasUpvoted(true);
        setHasDownvoted(false);
        await UpsArticle(article_id, user_id, false);
        await DownsArticle(article_id, user_id, true);
      }
    }
  };

  const onDownClick = async () => {
    if (user_id) {
      if (hasDownvoted) {
        setHasDownvoted(false);
        await DownsArticle(article_id, user_id, true);
      } else {
        setHasDownvoted(true);
        setHasUpvoted(false);
        await DownsArticle(article_id, user_id, false);
        await UpsArticle(article_id, user_id, true);
      }
    }
  };

  return (
    <>
      <div className="flex space-x-2">
        {hasUpvoted ? (
          <button onClick={onUpClick}>
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

      {hasDownvoted ? (
        <button onClick={onDownClick}>
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
