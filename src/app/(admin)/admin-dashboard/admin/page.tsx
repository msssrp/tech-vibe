import React from "react";
import { getAdminOrNpru } from "@/libs/actions/user/userClient";
import {
  getAdminCount,
  getModeratorCount,
  getUsersCount,
} from "@/libs/actions/user/user_role";
import UserTabs from "../../component/UserTabs";
import UserStat from "../../component/UserStat";
import UserCard from "../../component/UserCard";

const page = async ({ searchParams }: { searchParams: { user: string } }) => {
  const user = await getAdminOrNpru();
  const userCount = await getUsersCount();
  const moderatorCount = await getModeratorCount();
  const adminCount = await getAdminCount();

  const generalUser =
    user &&
    user.filter(
      (user) =>
        user.user_role_name !== "npru" && user.user_role_name === "admin"
    ).length;
  const npruUser =
    user && user.filter((user) => user.user_role_name === "npru").length;

  const filterUser =
    user &&
    user.filter((user) => {
      if (searchParams && searchParams.user) {
        return user.user_role_name === searchParams.user;
      }
      return user.user_role_name === "admin";
    });
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
            {filterUser &&
              filterUser.map((user: any) => {
                if (user.user && user.user_role_name && user.user_id) {
                  return (
                    <UserCard
                      key={user.user.user_id}
                      userRole={user.user_role_name}
                      user={user.user}
                    />
                  );
                }
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
