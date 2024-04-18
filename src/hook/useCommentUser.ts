import { getUserFromClient } from "@/libs/actions/user/userClient";
import { convertTimeWithHM } from "@/libs/convertTime";
import { userProps } from "@/types/user/user";
import React, { useEffect, useState } from "react";

const useCommentUser = (user_id: string, timeStamp: string) => {
  const [userComment, setUserComment] = useState<userProps>();
  const { day, month, hours, minutes } = convertTimeWithHM(timeStamp);
  useEffect(() => {
    const fetchUserComment = async () => {
      const data = await getUserFromClient(user_id);
      if (data) {
        return setUserComment(data);
      }
    };
    fetchUserComment();
  }, [user_id]);
  return { userComment, day, month, hours, minutes };
};

export default useCommentUser;
