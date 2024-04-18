import { articleslist } from "@/components/ui/Items";
import { getUserFollowerFromClient } from "@/libs/actions/user/user_following";
import { getUserFromClient } from "@/libs/actions/user/userClient";
import { userProps } from "@/types/user/user";
import React, { useEffect, useState } from "react";

const useProfile = (userId: string) => {
  const [userData, setUserData] = useState<userProps>();
  const [userFollower, setUserFollower] = useState<number | null>();
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUserData = async () => {
      const user = await getUserFromClient(userId);
      setUserData(user);
      const userFollow = await getUserFollowerFromClient(userId);
      setUserFollower(userFollow.count);
      setIsLoading(false);
    };
    getUserData();
  }, [userId]);

  const sliceArticleslist = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, articleslist.length);
    return articleslist.slice(startIndex, endIndex);
  };
  return {
    isLoading,
    userData,
    userFollower,
    sliceArticleslist,
  };
};

export default useProfile;
