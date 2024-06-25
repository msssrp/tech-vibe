import React from "react";
import ProfilTabs from "./component/ProfilTabs";
import PendingArticles from "./component/PendingArticles";
import PublishedArticles from "./component/PublishedArticles";
import HiddenArticles from "./component/HiddenArticles";
import DraftedArticles from "./component/DraftedArticles";
import Library from "./component/Library";
import getUserSession from "@/libs/actions/user/auth/getSession";
import {
  getAllArticleByUserId,
  getArticleById,
  getArticleByStatusOnUserId,
  getArticleByUserIdOnServer,
} from "@/libs/actions/article/article";
import { getUser } from "@/libs/actions/user/user";
import { getUserRoleOnServer } from "@/libs/actions/user/user_role";
import { getReadlistsOnServer } from "@/libs/actions/readlists/readlists";
import { getSavedArticleByReadlistIdOnServer } from "@/libs/actions/savedArticle/savedArticle";

const page = async ({ params }: { params: { profileSlug: string[] } }) => {
  const currentUser = await getUserSession();
  const user = await getUser(params.profileSlug[0]);
  const userRole = await getUserRoleOnServer(user.user_id);
  if (params.profileSlug.length === 1 && currentUser.data.user) {
    const articles = await getArticleByUserIdOnServer(params.profileSlug[0]);
    const userArticles = await getAllArticleByUserId(currentUser.data.user.id);
    if (params.profileSlug[0] === currentUser.data.user.id) {
      const readlists = await getReadlistsOnServer(currentUser.data.user.id);
      return (
        <ProfilTabs
          articles={articles}
          user={user}
          userRole={userRole}
          sessionUserId={currentUser.data.user.id}
          userArticles={userArticles}
          readlists={readlists}
        />
      );
    }
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
    const pendingArticles = await getArticleByStatusOnUserId(
      currentUser.data.user.id,
      "pending"
    );
    const publishedArticles = await getArticleByStatusOnUserId(
      currentUser.data.user.id,
      "public"
    );
    const hiddenArticles = await getArticleByStatusOnUserId(
      currentUser.data.user.id,
      "hidden"
    );
    const draftedArticles = await getArticleByStatusOnUserId(
      currentUser.data.user.id,
      "draft"
    );

    if (params.profileSlug[1] === "pending-articles")
      return (
        <PendingArticles
          userId={params.profileSlug[0]}
          articles={pendingArticles}
          user={user}
          userRole={userRole}
        />
      );
    if (params.profileSlug[1] === "published-articles")
      return (
        <PublishedArticles
          userId={params.profileSlug[0]}
          articles={publishedArticles}
          user={user}
          userRole={userRole}
        />
      );
    if (params.profileSlug[1] === "hidden-articles")
      return (
        <HiddenArticles
          userId={params.profileSlug[0]}
          articles={hiddenArticles}
          user={user}
          userRole={userRole}
        />
      );
    if (params.profileSlug[1] === "drafted-articles")
      return (
        <DraftedArticles
          userId={params.profileSlug[0]}
          articles={draftedArticles}
          user={user}
          userRole={userRole}
        />
      );
    if (
      params.profileSlug[1] === "library" &&
      params.profileSlug[0] === currentUser.data.user.id
    ) {
      const savedArticle = await getSavedArticleByReadlistIdOnServer(
        params.profileSlug[2]
      );
      if (savedArticle) {
        const articlePromises = savedArticle.map(async (item) => {
          const article = await getArticleById(item.article_id);
          const user = await getUser(article.user_id);
          const userRole = await getUserRoleOnServer(article.user_id);
          return {
            user,
            userRole,
            article,
          };
        });
        const result = await Promise.all(articlePromises);

        return (
          <Library userId={params.profileSlug[0]} user={user} result={result} />
        );
      }
    }
  }
};

export default page;
