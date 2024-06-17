"use client";
import useFollowText from "@/hook/useFollowText";
import React from "react";

type FollowTextProps = {
  isFollowing: number | null;
  ourUserId: string;
  userIdToFollow: string;
};

const FollowText: React.FC<FollowTextProps> = ({
  isFollowing,
  ourUserId,
  userIdToFollow,
}) => {
  const { isFollowingUser, handleFollow, handleUnFollow } = useFollowText(
    isFollowing,
    ourUserId,
    userIdToFollow
  );
  if (isFollowingUser) {
    return <button onClick={handleUnFollow}>following</button>;
  }
  return (
    <button onClick={handleFollow} className="text-green-400">
      follow
    </button>
  );
};

export default FollowText;
