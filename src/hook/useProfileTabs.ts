import { getArticleByUserId } from "@/libs/actions/article/article";
import { getUserRole } from "@/libs/actions/user/user_role";
import { getUserFromClient } from "@/libs/actions/user/userClient";
import { articleProps } from "@/types/article/article";
import { userProps } from "@/types/user/user";
import React, { useEffect, useState } from "react";

type userRole = {
  userRole:
    | {
        user_role_name: string;
      }[]
    | null;
};

const useProfileTabs = (userId: string) => {
  const [userData, setUserData] = useState<userProps>();
  const [articles, setArticles] = useState<articleProps[]>();
  const [userRole, setUserRole] = useState<userRole["userRole"]>();
  const [homeLoading, setHomeLoading] = useState(true);
  useEffect(() => {
    const fetchAllData = async () => {
      const userData = await getUserFromClient(userId);
      if (userData) {
        setUserData(userData);
        const userRole = await getUserRole(userData.user_id);
        setUserRole(userRole);
      }
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
    userRole,
  };
};

export default useProfileTabs;
