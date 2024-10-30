import React from "react";
import { redirect } from "next/navigation";
import { Badge } from "@mantine/core";
import { Metadata } from "next";
import Image from "next/image";
import { getArticleByUsernamandPostId } from "@/libs/actions/article/article";
import FollowText from "../../../../[user]/[post_id]/component/FollowText";
import ArticleContent from "../../../../[user]/[post_id]/component/ArticleContent";
import FollowBtn from "../../../../[user]/[post_id]/component/FollowBtn";
import usePreviewPage from "@/hook/usePreview";
import ApproveBtn from "@/app/(manage)/component/ApproveBtn";
import { getComplaintByArticleId } from "@/libs/actions/complaint/complaint";
import ComplaintInteract from "@/app/(manage)/manage/complaint/component/ComplaintInteract";

export async function generateMetadata({
  params,
}: {
  params: { user: string; post_id: string };
  searchParams: { commend: boolean };
}): Promise<Metadata> {
  const userName = params.user;
  const articleNameAndId = params.post_id;
  const splitArticle = articleNameAndId.split("-");
  const articleTitleArray = splitArticle.slice(0, -1);
  const articleTitle = articleTitleArray
    .join("-")
    .replace(/\&/g, "/")
    .replace(/\%26/g, "/");
  const articleId = splitArticle[splitArticle.length - 1];
  const article = await getArticleByUsernamandPostId(
    userName,
    articleTitle,
    articleId
  );
  return {
    applicationName: "TechVibe",
    publisher: `${userName}`,
    title: article.pgrst_scalar.article_title,
    description: article.pgrst_scalar.article_description,
    openGraph: {
      images: `${article.pgrst_scalar.article_cover}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${article.pgrst_scalar.article_title}`,
      description: `${article.pgrst_scalar.article_description}`,
      siteId: `${article.pgrst_scalar.article_id}`,
      creator: `${userName}`,
      creatorId: `${userName}`,
      images: `${article.pgrst_scalar.article_cover}`,
    },
  };
}
const page = async ({
  params,
  searchParams,
}: {
  params: { complaintId: string; user: string; post_id: string };
  searchParams: { commend: string };
}) => {
  if (!params.user && !params.post_id) redirect("/");
  console.log(params);

  const userName = params.user;
  const articleNameAndId = params.post_id;
  const splitArticle = articleNameAndId.split("-");
  const articleTitleArray = splitArticle.slice(0, -1);
  const articleTitle = articleTitleArray
    .join("-")
    .replace(/\&/g, "/")
    .replace(/\%26/g, "/");
  const articleId = splitArticle[splitArticle.length - 1];
  const {
    article,
    userSession,
    user,
    userFollow,
    day,
    month,
    Tagdata,
    UserFollowers,
  } = await usePreviewPage(userName, articleTitle, articleId);
  if (!article.pgrst_scalar.created_at || !article.pgrst_scalar.user_id)
    return redirect("/");
  const complaint = await getComplaintByArticleId(
    article.pgrst_scalar.article_id
  );

  if (!complaint) return redirect("/");

  return (
    <>
      <div className="flex flex-col space-y-2 h-auto container px-5 lg:px-80 mx-auto mt-9">
        <div className="flex flex-col space-y-4">
          <div className="font-semibold text-2xl">
            <span>{article.pgrst_scalar.article_title}</span>
          </div>
          <div className="text-[#616160] text-sm">
            <span>{article.pgrst_scalar.article_description}</span>
          </div>
          <div className="flex space-x-5 items-center border-t border-b pt-3 pb-3">
            <div className="">
              <Image
                height={50}
                width={50}
                src={user.user_profile ? user.user_profile : ""}
                className="rounded-full h-10 w-10"
                alt={article.pgrst_scalar.article_title}
              />
            </div>
            <div className="h-16 flex flex-col -space-y-3">
              <div className="flex space-x-4">
                <span className="text-md">{user.user_fullname}</span>
                {article.pgrst_scalar.user_id === userSession.user?.id ? (
                  <></>
                ) : (
                  userSession.user && (
                    <FollowText
                      isFollowing={userFollow}
                      userIdToFollow={article.pgrst_scalar.user_id}
                      ourUserId={userSession.user.id}
                    />
                  )
                )}
              </div>
              <div className="text-[#616160] flex space-x-2">
                <p>{month}</p>
                <p> {day}</p>
              </div>
            </div>
          </div>
        </div>
        <ArticleContent article={article.pgrst_scalar.article_content} />
        <div className="flex space-x-3 pt-8 pb-10">
          {Tagdata &&
            Tagdata.tag_name.map((tag: any, index: any) => (
              <Badge
                key={index}
                size="md"
                autoContrast
                color="rgba(242,242,242)"
                className="text-black"
              >
                {tag}
              </Badge>
            ))}
        </div>
        <div className="flex items-center justify-center">
          {complaint.some(
            (complaint) => complaint.article.article_status === "complaint"
          ) ? (
            <div className="btn btn-md">This article have been complainted</div>
          ) : (
            <ComplaintInteract
              complaintId={params.complaintId}
              articleId={complaint[0].article_id}
              articleTitle={complaint[0].article.article_title}
              userId={complaint[0].article.user_id}
              complaintBtnName={"Manage"}
            />
          )}
        </div>
      </div>
      <footer className="bg-[#F5F5F5] mt-5">
        <div className="container mx-auto px-4 lg:px-64 flex items-center justify-between py-10 pb-14">
          <div className="flex flex-col space-y-3">
            <div className="w-10 h-10 lg:w-16 lg:h-16">
              <Image
                width={70}
                height={70}
                src={user.user_profile ? user.user_profile : ""}
                alt={article.pgrst_scalar.article_title}
                className="rounded-full h-full w-full"
              />
            </div>
            <span className="text-md lg:text-lg">{user.user_fullname}</span>
            {UserFollowers && UserFollowers > 1 ? (
              <p className="text-sm lg:text-md">{UserFollowers} Followers</p>
            ) : (
              <p className="text-sm lg:text-md">{UserFollowers} Follower</p>
            )}
          </div>
          <div>
            {article.pgrst_scalar.user_id === userSession.user?.id ? (
              <></>
            ) : (
              userSession.user && (
                <FollowBtn
                  isFollowing={userFollow}
                  ourUserId={userSession.user.id}
                  userIdToFollow={article.pgrst_scalar.user_id}
                />
              )
            )}
          </div>
        </div>
      </footer>
    </>
  );
};

export default page;
