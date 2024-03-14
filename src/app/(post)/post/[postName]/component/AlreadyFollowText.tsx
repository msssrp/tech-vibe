import { unFollowUser } from "@/libs/actions/user/user_following";
import { useRouter } from "next/navigation";
import React from "react";

type alreadyFollowText = {
  user_id: string;
};

const AlreadyFollowText: React.FC<alreadyFollowText> = ({ user_id }) => {
  const router = useRouter();
  const handleUnFollow = async () => {
    await unFollowUser(user_id);
    router.refresh();
  };
  return <button onClick={handleUnFollow}>following</button>;
};

export default AlreadyFollowText;
