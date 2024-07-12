import { articleslist } from "@/components/ui/Items";
import { getUserFollowerFromClient } from "@/libs/actions/user/user_following";
import { getUserFromClient } from "@/libs/actions/user/userClient";
import { userProps } from "@/types/user/user";
import React, { useEffect, useState } from "react";

const useProfile = () => {
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);

  const sliceArticleslist = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, articleslist.length);
    return articleslist.slice(startIndex, endIndex);
  };
  return {
    sliceArticleslist,
  };
};

export default useProfile;
