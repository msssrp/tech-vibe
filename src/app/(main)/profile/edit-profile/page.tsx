import React from "react";
import { Metadata } from "next";
import EditProfile from "./component/EditProfile";
import getUserSession from "@/libs/actions/user/auth/getSession";
import { redirect } from "next/navigation";
import { getUser } from "@/libs/actions/user/user";
import { getUserFollower } from "@/libs/actions/user/user_following";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Edit Profile`,
    description: "TechVibe edit profile",
  };
}

const page = async () => {
  const currentUser = await getUserSession();
  if (!currentUser.data.user) return redirect("/SignIn");
  const getUserData = await getUser(currentUser.data.user.id);
  if (currentUser.data.user.id !== getUserData.user_id) return redirect("/");
  const userFollowerCount = await getUserFollower(getUserData.user_id);
  return (
    <div>
      <EditProfile
        user={getUserData}
        userFollowerCount={userFollowerCount.count}
      />
    </div>
  );
};

export default page;
