import React from "react";
import UserTabs from "../component/UserTabs";
import { getUserWithRole } from "@/libs/actions/user/userClient";
import UserStat from "../component/UserStat";
import { getUsersCount } from "@/libs/actions/user/user_role";
import getUserSession from "@/libs/actions/user/auth/getSession";
import DataTable from "@/components/main/userTable/DataTable";
import { redirect } from "next/navigation";

const page = async () => {
  const user = await getUserWithRole();
  const userCount = await getUsersCount();
  const userSession = await getUserSession();
  if (!userSession) return redirect("/SignIn");
  const generalUser =
    user &&
    user.filter((user) =>
      user.user_role.some(
        (user) =>
          user.user_role_name !== "npru" && user.user_role_name === "user"
      )
    ).length;
  const npruUser =
    user &&
    user.filter((user) =>
      user.user_role.some((user) => user.user_role_name === "npru")
    ).length;

  return (
    <div className="flex flex-col space-y-4">
      {/*Tabs*/}
      <div className="flex flex-col">
        <UserTabs />
        <div className="min-h-screen bg-[#F4F2FB]">
          <UserStat
            allUsers={userCount}
            generalUser={generalUser}
            npruUser={npruUser}
          />
          <div className="flex flex-col lg:flex-row flex-wrap justify-center items-center mt-5 w-full">
            {userSession.data && userSession.data.user && user && (
              <DataTable user={user} userSessionId={userSession.data.user.id} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
