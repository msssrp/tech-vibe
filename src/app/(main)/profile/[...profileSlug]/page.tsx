import React from "react";
import ProfilTabs from "./component/ProfilTabs";
import PendingArticles from "./component/PendingArticles";
import PublishedArticles from "./component/PublishedArticles";
import HiddenArticles from "./component/HiddenArticles";
import DraftedArticles from "./component/DraftedArticles";
import Library from "./component/Library";
import getUserSession from "@/libs/actions/user/auth/getSession";
import { getArticleByUserIdOnServer } from "@/libs/actions/article/article";
import { getUser } from "@/libs/actions/user/user";
import { getUserRoleOnServer } from "@/libs/actions/user/user_role";

const page = async ({ params }: { params: { profileSlug: string[] } }) => {
  const currentUser = await getUserSession();
  if (params.profileSlug.length === 1 && currentUser.data.user) {
    const articles = await getArticleByUserIdOnServer(params.profileSlug[0]);
    const user = await getUser(params.profileSlug[0]);
    const userRole = await getUserRoleOnServer(user.user_id);
    return (
      <ProfilTabs
        articles={articles}
        user={user}
        userRole={userRole}
        sessionUserId={currentUser.data.user.id}
      />
    );
  }
  if (
    currentUser.data.user &&
    currentUser.data.user.id === params.profileSlug[0]
  ) {
    if (params.profileSlug[1] === "pending-articles")
      return <PendingArticles userId={params.profileSlug[0]} />;
    if (params.profileSlug[1] === "published-articles")
      return <PublishedArticles userId={params.profileSlug[0]} />;
    if (params.profileSlug[1] === "hidden-articles")
      return <HiddenArticles userId={params.profileSlug[0]} />;
    if (params.profileSlug[1] === "drafted-articles")
      return <DraftedArticles userId={params.profileSlug[0]} />;
    if (params.profileSlug[1] === "library")
      return <Library userId={params.profileSlug[0]} />;
  }
};

export default page;
