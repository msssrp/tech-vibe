"use client";
import {
  newFollowUser,
  unFollowUser,
} from "@/libs/actions/user/user_following";
import { useFollowStore } from "@/store/followStore";
import React, { useEffect, useState } from "react";

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
  const { isFollowingUser, setIsFollowingUser } = useFollowStore();
  useEffect(() => {
    setIsFollowingUser(isFollowing === 1);
  }, [isFollowing, setIsFollowingUser]);

  const handleFollow = async () => {
    setIsFollowingUser(true);
    await newFollowUser(ourUserId, userIdToFollow);
  };

  const handleUnFollow = async () => {
    setIsFollowingUser(false);
    await unFollowUser(userIdToFollow);
  };
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
