import Link from "next/link";
import React, { useState } from "react";

type userTabsProps = {
  userTotal: number | null | undefined;
  moderatorTotal: number | null | undefined;
  adminTotal: number | null | undefined;
  isActiveAt: string;
};

const UserTabs: React.FC<userTabsProps> = ({
  userTotal,
  moderatorTotal,
  adminTotal,
  isActiveAt,
}) => {
  return (
    <div className="flex items-center lg:px-9 text-sm lg:text-base">
      <Link
        href={"/admin-dashboard"}
        className={`py-3 px-5 lg:px-9 bth hover:bg-[#F2F4FB] border-none rounded-tl-2xl rounded-tr-2xl ${
          isActiveAt === "Users" ? "bg-[#F2F4FB]" : "bg-transparent"
        }`}>
        Users ({userTotal})
      </Link>
      <Link
        href={"/admin-dashboard/moderator"}
        className={`py-3 px-5 lg:px-9 bth hover:bg-[#F2F4FB] border-none rounded-tl-2xl rounded-tr-2xl ${
          isActiveAt === "Moderator" ? "bg-[#F2F4FB]" : "bg-transparent"
        }`}>
        Moderator ({moderatorTotal})
      </Link>
      <Link
        href={"/admin-dashboard/admin"}
        className={`py-3 px-5 lg:px-9 bth hover:bg-[#F2F4FB] border-none rounded-tl-2xl rounded-tr-2xl ${
          isActiveAt === "Admin" ? "bg-[#F2F4FB]" : "bg-transparent"
        }`}>
        Admin ({adminTotal})
      </Link>
    </div>
  );
};

export default UserTabs;
