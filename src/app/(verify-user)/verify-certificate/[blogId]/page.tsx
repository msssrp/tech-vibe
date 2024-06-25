import { getArticleById } from "@/libs/actions/article/article";
import { getArticleUps } from "@/libs/actions/article/articleStat";
import { getUser } from "@/libs/actions/user/user";
import { redirect } from "next/navigation";
import React from "react";
import CertificateGen from "./component/CertificateGen";
import getUserSession from "@/libs/actions/user/auth/getSession";
import { getCertificateUri, getUpvotes } from "@/libs/actions/web3/web3";

const imagesPath = process.env.NEXT_PUBLIC_IMAGES_PATH as string;

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
  const certPath = await getCertificateUri();
  const certUrl = imagesPath + certPath;
  return (
    <CertificateGen
      userFullName={user.user_fullname}
      articleName={articleData.article_title}
      certificateImageUrl={certUrl}
    />
  );
};

export default page;
