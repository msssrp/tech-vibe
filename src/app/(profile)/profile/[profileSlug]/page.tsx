import React from "react";
import Profile from "./component/Profile";
import getUserSession from "@/libs/actions/user/auth/getSession";
import { redirect } from "next/navigation";
import ProfilTabs from "./component/ProfilTabs";
import { getUser } from "@/libs/actions/user/user";
import { getUserFollower } from "@/libs/actions/user/user_following";

const page = async ({ params }: { params: { profileSlug: string } }) => {
  const { data } = await getUserSession();
  if (!data.user) redirect("/");
  const userId = params.profileSlug;

  return (
    <div className="container mx-auto px-44">
      <div className="flex divide-x h-auto relative">
        {/* left */}

        <ProfilTabs userId={userId} />
        {/* Right */}
        <Profile userId={userId} sessionUserId={data.user.id} />
      </div>
    </div>
  );
};

export default page;
