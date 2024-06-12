"use client";
import React, { useContext, useEffect, useState } from "react";
import UserTabs from "../../component/UserTabs";
import UserStat from "../../component/UserStat";
import UserCard from "../../component/UserCard";
import { AdminUserContext } from "@/context/AdminUserContext";
import { useSearchParams } from "next/navigation";
import { getAdminOrNpru } from "@/libs/actions/user/userClient";

const page = () => {
  const { userCount, adminCount, moderatorCount } =
    useContext(AdminUserContext);
  const [user, setUser] = useState<any>();
  const searchParams = useSearchParams();
  const userSearch = searchParams.get("user");
  useEffect(() => {
    const getUser = async () => {
      const data = await getAdminOrNpru();
      if (data) return setUser(data);
    };
    getUser();
  }, []);
  const generalUser = user?.filter(
    (user: any) =>
      user.user_role_name !== "npru" && user.user_role_name === "admin"
  ).length;
  const npruUser = user?.filter(
    (user: any) => user.user_role_name === "npru"
  ).length;

  const filterUser = user?.filter((user: any) =>
    userSearch
      ? user.user_role_name === userSearch
      : user.user_role_name === "admin"
  );
  return (
    <div className="flex flex-col space-y-4">
      {/*Tabs*/}
      <div className="flex flex-col">
        <UserTabs
          userTotal={userCount}
          moderatorTotal={moderatorCount}
          adminTotal={adminCount}
          isActiveAt="Admin"
        />
        <div className="min-h-screen bg-[#F4F2FB]">
          <UserStat
            allUsers={userCount}
            generalUser={generalUser}
            npruUser={npruUser}
            adminTab={true}
          />
          <div className="flex flex-col lg:flex-row flex-wrap justify-center items-center mt-5 w-full">
            {filterUser?.map((user: any) => (
              <UserCard userRole={user.user_role_name} user={user.user} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
