"use client";
import React, { useContext, useEffect, useState } from "react";
import UserTabs from "../../component/UserTabs";
import UserStat from "../../component/UserStat";
import UserCard from "../../component/UserCard";
import { AdminUserContext } from "@/context/AdminUserContext";
import { useSearchParams } from "next/navigation";
import { getModeratorOrNpru } from "@/libs/actions/user/userClient";

const Page = () => {
  const { userCount, adminCount, moderatorCount } =
    useContext(AdminUserContext);
  const [user, setUser] = useState<any>();
  const searchParams = useSearchParams();
  const userSearch = searchParams.get("user");
  useEffect(() => {
    const getUser = async () => {
      const data = await getModeratorOrNpru();
      if (data) return setUser(data);
    };
    getUser();
  }, []);
  const generalUser = user?.filter(
    (user: any) =>
      user.user_role_name !== "npru" && user.user_role_name === "moderator"
  ).length;
  const npruUser = user?.filter(
    (user: any) => user.user_role_name === "npru"
  ).length;

  const filterUser = user?.filter((user: any) =>
    userSearch
      ? user.user_role_name === userSearch
      : user.user_role_name === "moderator"
  );
  return (
    <div className="flex flex-col space-y-4">
      {/*Tabs*/}
      <div className="flex flex-col">
        <UserTabs
          userTotal={generalUser}
          moderatorTotal={moderatorCount}
          adminTotal={adminCount}
          isActiveAt="Moderator"
        />
        <div className="min-h-screen bg-[#F4F2FB]">
          <UserStat
            allUsers={userCount}
            generalUser={generalUser}
            npruUser={npruUser}
            moderatorTab={true}
          />
          <div className="flex flex-col lg:flex-row flex-wrap justify-center items-center mt-5 w-full">
            {filterUser?.map((user: any) => (
              <UserCard
                key={user.user.user_id}
                userRole={user.user_role_name}
                user={user.user}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
