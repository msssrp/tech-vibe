import { getUserFromClient } from "@/libs/actions/user/userClient";
import { convertTimeWithHM } from "@/libs/convertTime";
import { userProps } from "@/types/user/user";
import React, { useEffect, useState } from "react";

type commentUserProps = {
  user_id: string;
  timeStamp: string;
};

const CommentUser: React.FC<commentUserProps> = ({ user_id, timeStamp }) => {
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

  return (
    <>
      <div className="w-11 h-11">
        <img
          src={userComment?.user_profile}
          alt=""
          className="w-full h-full rounded-full"
        />
      </div>
      <div className="flex flex-col space-y-2">
        <span className="font-semibold">{userComment?.user_fullname}</span>
        <div className="flex items-center text-[#616160] space-x-2">
          <p>{day}</p>
          <p>{month}</p>
          <p>
            {hours}:{minutes}
          </p>
        </div>
      </div>
    </>
  );
};

export default CommentUser;
