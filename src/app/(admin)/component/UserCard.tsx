import NpruVerify from "@/components/ui/NpruVerify";
import { userProps } from "@/types/user/user";
import Image from "next/image";
import React from "react";
type userCardProps = {
  userRole: string;
  user: userProps;
};

const UserCard: React.FC<userCardProps> = ({ userRole, user }) => {
  return (
    <div className="w-96 p-4 mr-5 mb-5 flex space-x-6 items-center bg-white">
      <Image
        src={user.user_profile}
        alt={user.user_fullname}
        height={70}
        width={70}
        className="rounded-full"
      />
      <div className="flex flex-col space-y-2 items-start">
        <div className="flex items-center space-x-2">
          <h1 className="font-medium">{user.user_fullname}</h1>
          {userRole === "npru" && <NpruVerify />}
        </div>
        <span className="text-base">{user.user_email}</span>
        <h1 className="text-xl font-medium">{userRole}</h1>
      </div>
    </div>
  );
};

export default UserCard;
