import { unFollowUser } from "@/libs/actions/user/user_following";
import { useRouter } from "next/navigation";
import React from "react";

type alreadyFollowBtn = {
  user_id: string;
};

const AlreadyFollowBtn: React.FC<alreadyFollowBtn> = ({ user_id }) => {
  const router = useRouter();
  const handleUnFollow = async () => {
    await unFollowUser(user_id);
    router.refresh();
  };
  return (
    <button
      onClick={handleUnFollow}
      className="bg-white text-black rounded-3xl btn">
      <span className="py-2 px-3">Following</span>
    </button>
  );
};

export default AlreadyFollowBtn;
