import {
  newFollowUser,
  unFollowUser,
} from "@/libs/actions/user/user_following";
import { useFollowStore } from "@/store/followStore";
import React, { useEffect } from "react";

const useFollowBtn = (
  isFollowing: number | null,
  ourUserId: string,
  userIdToFollow: string
) => {
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

  return { isFollowingUser, handleFollow, handleUnFollow };
};

export default useFollowBtn;
