import { getArticleByUserId } from "@/libs/actions/article/article";
import { getUserFromClient } from "@/libs/actions/user/userClient";
import { articleProps } from "@/types/article/article";
import { userProps } from "@/types/user/user";
import React, { useEffect, useState } from "react";

const useProfileTabs = (userId: string) => {
  const [userData, setUserData] = useState<userProps>();
  const [articles, setArticles] = useState<articleProps[]>();
  const [homeLoading, setHomeLoading] = useState(true);
  useEffect(() => {
    const fetchAllData = async () => {
      const userData = await getUserFromClient(userId);
      if (userData) setUserData(userData);
      const articleData = await getArticleByUserId(userId);
      if (articleData) setArticles(articleData);
      setHomeLoading(false);
    };
    fetchAllData();
  }, [userId]);
  return {
    userData,
    articles,
    homeLoading,
  };
};

export default useProfileTabs;
