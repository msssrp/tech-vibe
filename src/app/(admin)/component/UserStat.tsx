import Link from "next/link";
import React from "react";

type userStatProps = {
  allUsers: number | null | undefined;
  generalUser: number | null | undefined;
  npruUser: number | null | undefined;
  moderatorTab?: boolean;
  adminTab?: boolean;
};

const UserStat: React.FC<userStatProps> = ({
  allUsers,
  generalUser,
  npruUser,
  moderatorTab,
  adminTab,
}) => {
  return (
    <div className="flex items-center justify-center space-x-6 mt-11">
      <div className="h-[100px] w-[350px] lg:h-[160px] lg:w-[220px] flex flex-col justify-center space-y-1 items-center bg-white rounded-xl">
        <h1 className="text-2xl lg:text-6xl font-semibold text-blue-500">
          {allUsers}
        </h1>
        <span className="text-sm lg:text-lg">All users</span>
      </div>
      <Link
        href={`${
          moderatorTab
            ? "/admin-dashboard/moderator?user=moderator"
            : adminTab
            ? "/admin-dashboard/admin?user=admin"
            : "/admin-dashboard?user=user"
        }`}
        className="h-[100px] w-[350px] lg:h-[160px] lg:w-[220px] flex flex-col justify-center space-y-1 items-center bg-white rounded-xl">
        <h1 className="text-2xl lg:text-6xl font-semibold text-orange-500">
          {generalUser}
        </h1>
        <span className="text-sm lg:text-lg">General user</span>
      </Link>
      <Link
        href={`${
          moderatorTab
            ? "/admin-dashboard/moderator?user=npru"
            : adminTab
            ? "/admin-dashboard/admin?user=npru"
            : "/admin-dashboard?user=npru"
        }`}
        className="h-[100px] w-[350px] lg:h-[160px] lg:w-[220px] flex flex-col justify-center space-y-1 items-center bg-white rounded-xl">
        <h1 className="text-2xl lg:text-6xl font-semibold text-green-500">
          {npruUser}
        </h1>
        <span className="text-sm lg:text-lg">NPRU user</span>
      </Link>
    </div>
  );
};

export default UserStat;
