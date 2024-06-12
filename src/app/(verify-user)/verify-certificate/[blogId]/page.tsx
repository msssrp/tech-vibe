import {
  getArticleById,
  getAuthorIdByArticleId,
} from "@/libs/actions/article/article";
import { getArticleUps } from "@/libs/actions/article/articleStat";
import { getUser } from "@/libs/actions/user/user";
import { redirect } from "next/navigation";
import React from "react";
import CertificateGen from "./component/CertificateGen";
import getUserSession from "@/libs/actions/user/auth/getSession";
import { getUpvotes } from "@/libs/actions/web3/web3";

const page = async ({ params }: { params: { blogId: string } }) => {
  const { data } = await getUserSession();
  if (!data.user) {
    return redirect("/");
  }

  const articleData = await getArticleById(params.blogId);
  if (data.user.id !== articleData.user_id) {
    return redirect("/");
  }
  const { data: articleUps } = await getArticleUps(params.blogId);
  const upvotes = await getUpvotes();

  if (articleUps < upvotes) {
    return redirect("/");
  }
  const user = await getUser(articleData.user_id);

  return (
    <CertificateGen
      userFullName={user.user_fullname}
      articleName={articleData.article_title}
    />
  );
};

export default page;
