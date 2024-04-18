import { DownsArticle, UpsArticle } from "@/libs/actions/article/articleStat";
import React, { useEffect, useState } from "react";

const useUpDownsbutton = (
  userUp: number | null,
  userDown: number | null,
  article_id: string,
  user_id: string | undefined
) => {
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
  return { hasUpvoted, hasDownvoted, onUpClick, onDownClick };
};

export default useUpDownsbutton;
