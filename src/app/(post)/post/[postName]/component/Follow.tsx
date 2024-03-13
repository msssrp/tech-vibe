"use client";
import React from "react";
import FollowerBtn from "./FollowerBtn";
import AlreadyFollowBtn from "./AlreadyFollowBtn";
import { useRouter } from "next/navigation";
import AlreadyFollowText from "./AlreadyFollowText";

type followProps = {
  user_id: string;
  OurUser_id: string;
  isBtn?: boolean;
  isFollowing: number | null;
};

const Follow: React.FC<followProps> = ({
  user_id,
  OurUser_id,
  isBtn,
  isFollowing,
}) => {
  const router = useRouter();
  const handleOnSuccess = () => {
    router.refresh();
  };
  if (isBtn) {
    if (isFollowing && isFollowing > 0) {
      return <AlreadyFollowBtn user_id={user_id} />;
    }
    return (
      <FollowerBtn
        onSuccess={handleOnSuccess}
        isBtn={true}
        ourUserId={OurUser_id}
        userIdToFollow={user_id}
      />
    );
  }
  if (isFollowing && isFollowing > 0) {
    return <AlreadyFollowText user_id={user_id} />;
  }
  return (
    <FollowerBtn
      onSuccess={handleOnSuccess}
      isBtn={false}
      ourUserId={OurUser_id}
      userIdToFollow={user_id}
    />
  );
};

export default Follow;
