import React from "react";
import ProfilTabs from "./component/ProfilTabs";
import PendingArticles from "./component/PendingArticles";
import PublishedArticles from "./component/PublishedArticles";
import HiddenArticles from "./component/HiddenArticles";
import DraftedArticles from "./component/DraftedArticles";

const page = async ({ params }: { params: { profileSlug: string[] } }) => {
  if (params.profileSlug.length === 1) {
    return <ProfilTabs userId={params.profileSlug[0]} />;
  }
  if (params.profileSlug.length === 2) {
    if (params.profileSlug[1] === "pending-articles")
      return <PendingArticles userId={params.profileSlug[0]} />;
    if (params.profileSlug[1] === "published-articles")
      return <PublishedArticles userId={params.profileSlug[0]} />;
    if (params.profileSlug[1] === "hidden-articles")
      return <HiddenArticles userId={params.profileSlug[0]} />;
    if (params.profileSlug[1] === "drafted-articles")
      return <DraftedArticles userId={params.profileSlug[0]} />;
  }
};

export default page;
