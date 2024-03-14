import { newFollowUser } from "@/libs/actions/user/user_following";
import { useRouter } from "next/navigation";
import React from "react";

type followBtnProps = {
  isBtn: boolean;
  userIdToFollow: string;
  ourUserId: string;
  onSuccess: () => void;
};

const FollowerBtn: React.FC<followBtnProps> = ({
  isBtn,
  userIdToFollow,
  ourUserId,
  onSuccess,
}) => {
  const router = useRouter();
  const handleFollow = async () => {
    await newFollowUser(ourUserId, userIdToFollow);
    router.refresh();
    onSuccess();
  };
  if (isBtn) {
    return (
      <button
        onClick={handleFollow}
        className="btn text-white bg-[#4DAF51] rounded-3xl">
        <span className="px-3">Follow</span>
      </button>
    );
  }
  return (
    <button onClick={handleFollow} className="text-green-400">
      follow
    </button>
  );
};

export default FollowerBtn;
