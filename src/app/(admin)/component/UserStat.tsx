import Link from "next/link";
import React from "react";

type userStatProps = {
  allUsers: number | null | undefined;
  generalUser: number | null | undefined;
  npruUser: number | null | undefined;
};

const UserStat: React.FC<userStatProps> = ({
  allUsers,
  generalUser,
  npruUser,
}) => {
  return (
    <div className="flex items-center justify-center space-x-2 xl:space-x-6 mt-11 bg-[#F4F2FB] w-full">
      <div className="h-[100px] w-[350px] lg:h-[140px] lg:w-[200px] xl:h-[160px] xl:w-[220px] flex flex-col justify-center space-y-1 items-center bg-white rounded-xl">
        <h1 className="text-2xl lg:text-5xl xl:text-6xl font-semibold text-blue-500">
          {allUsers}
        </h1>
        <span className="text-sm lg:text-lg">All users</span>
      </div>
      <div className="h-[100px] w-[350px] lg:h-[140px] lg:w-[200px] xl:h-[160px] xl:w-[220px] flex flex-col justify-center space-y-1 items-center bg-white rounded-xl">
        <h1 className="text-2xl lg:text-5xl xl:text-6xl font-semibold text-orange-500">
          {generalUser}
        </h1>
        <span className="text-sm lg:text-lg">General user</span>
      </div>
      <div className="h-[100px] w-[350px] lg:h-[140px] lg:w-[200px] xl:h-[160px] xl:w-[220px] flex flex-col justify-center space-y-1 items-center bg-white rounded-xl">
        <h1 className="text-2xl lg:text-5xl xl:text-6xl font-semibold text-green-500">
          {npruUser}
        </h1>
        <span className="text-sm lg:text-lg">NPRU user</span>
      </div>
    </div>
  );
};

export default UserStat;
