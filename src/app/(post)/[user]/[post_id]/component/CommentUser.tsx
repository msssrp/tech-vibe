import useCommentUser from "@/hook/useCommentUser";
import Image from "next/image";
import React from "react";

type commentUserProps = {
  user_id: string;
  timeStamp: string;
};

const CommentUser: React.FC<commentUserProps> = ({ user_id, timeStamp }) => {
  const { userComment, day, minutes, month, hours } = useCommentUser(
    user_id,
    timeStamp
  );

  return (
    <>
      <div className="w-11 h-11">
        <Image
          height={50}
          width={50}
          src={userComment?.user_profile ? userComment?.user_profile : ""}
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
