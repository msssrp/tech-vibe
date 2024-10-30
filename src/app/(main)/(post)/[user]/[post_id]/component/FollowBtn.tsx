"use client";
import useFollowBtn from "@/hook/useFollowBtn";
import React from "react";

type FollowBtnProps = {
  isFollowing: number | null;
  ourUserId: string;
  userIdToFollow: string;
};

const FollowBtn: React.FC<FollowBtnProps> = ({
  isFollowing,
  ourUserId,
  userIdToFollow,
}) => {
  const { isFollowingUser, handleUnFollow, handleFollow } = useFollowBtn(
    isFollowing,
    ourUserId,
    userIdToFollow
  );

  if (isFollowingUser) {
    return (
      <button
        onClick={handleUnFollow}
        className="bg-white text-black rounded-3xl btn">
        <span className="py-2 px-3">Following</span>
      </button>
    );
  }
  return (
    <button
      onClick={handleFollow}
      className="btn text-white bg-[#4DAF51] rounded-3xl">
      <span className="px-3">Follow</span>
    </button>
  );
};

export default FollowBtn;
