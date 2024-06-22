import getUserSession from "@/libs/actions/user/auth/getSession";
import Profile from "./component/Profile";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { getUser } from "@/libs/actions/user/user";
import { getUserFollower } from "@/libs/actions/user/user_following";
import { getPopularArticle } from "@/libs/actions/article/article";

export async function generateMetadata({
  params,
}: {
  params: { profileSlug: string[] };
}): Promise<Metadata> {
  const user = await getUser(params.profileSlug[0]);
  return {
    title: `${user.user_fullname}`,
    description: "TechVibe user profile",
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { profileSlug: string[] };
}) {
  const { data } = await getUserSession();
  if (!data.user) redirect("/");
  const user = await getUser(params.profileSlug[0]);
  const userFollowNumber = await getUserFollower(user.user_id);
  const popularArticles = await getPopularArticle();
  return (
    <div className="container mx-auto px-44">
      <div className="flex divide-x h-auto relative">
        {children}
        <Profile
          popularArticles={popularArticles}
          user={user}
          sessionUserId={data.user.id}
          userFollower={userFollowNumber.count}
        />
      </div>
    </div>
  );
}
