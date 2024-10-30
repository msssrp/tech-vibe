import React from "react";
import { redirect } from "next/navigation";
import { Badge } from "@mantine/core";
import DrawerComment from "./component/DrawerComment";
import { Metadata } from "next";
import UpDownsButton from "./component/UpDownsButton";
import InteractBtn from "./component/InteractBtn";
import FollowText from "./component/FollowText";
import FollowBtn from "./component/FollowBtn";
import Image from "next/image";
import usePostPage from "@/hook/usePost";
import { increaseArticleViews } from "@/libs/actions/article/articleStat";
import { getArticleByUsernamandPostId } from "@/libs/actions/article/article";
import Link from "next/link";
import ArticleContent from "./component/ArticleContent";
import DeleteBtn from "./component/DeleteBtn";
import { getUpvotes } from "@/libs/actions/web3/web3";
import { createNewNotificationServer } from "@/libs/actions/notification/notification";
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
const Page = async ({
  params,
  searchParams,
}: {
  params: { user: string; post_id: string };
  searchParams: { commend: string };
}) => {
  if (!params.user && !params.post_id) redirect("/");
  const userName = params.user;
  const articleNameAndId = params.post_id;
  const splitArticle = articleNameAndId.split("-");
  const articleTitleArray = splitArticle.slice(0, -1);
  const articleTitle = articleTitleArray
    .join("-")
    .replace(/\&/g, "/")
    .replace(/\%26/g, "/");
  const articleId = splitArticle[splitArticle.length - 1];
  const openCommend = searchParams.commend;
  const {
    article,
    userSession,
    user,
    userFollow,
    day,
    month,
    articleUps,
    UpCount,
    DownCount,
    CommentData,
    Tagdata,
    UserFollowers,
  } = await usePostPage(userName, articleTitle, articleId);
  if (!article.pgrst_scalar.created_at || !article.pgrst_scalar.user_id)
    redirect("/");

  if (userSession.data.user?.id) {
    await increaseArticleViews(
      article.pgrst_scalar.article_id,
      userSession.data.user.id
    );
  }

  if (
    userSession.data.user &&
    userSession.data.user.id === article.pgrst_scalar.user_id
  ) {
    const currentUpVoteSet = await getUpvotes();
    console.log(currentUpVoteSet, articleUps);

    if (articleUps >= currentUpVoteSet) {
      await createNewNotificationServer(
        `Your article reached ${articleUps} upvotes`,
        "upvote",
        `Your article ${article.pgrst_scalar.article_title} reached ${articleUps} upvotes. Now you can claim a certificate from the website.`,
        userSession.data.user.id,
        article.pgrst_scalar.article_title
      );
    }
  }

  if (
    article.pgrst_scalar.article_status !== "public" &&
    article.pgrst_scalar.user_id !== userSession.data.user?.id
  )
    redirect("/");

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
          <div className="flex space-x-5 items-center">
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
                {article.pgrst_scalar.user_id === userSession.data.user?.id ? (
                  <></>
                ) : (
                  userSession.data.user && (
                    <FollowText
                      isFollowing={userFollow}
                      userIdToFollow={article.pgrst_scalar.user_id}
                      ourUserId={userSession.data.user.id}
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
          <div className="border-t border-b flex justify-between items-center py-3 px-3">
            <div className="flex items-center space-x-4">
              <UpDownsButton
                articleUp={articleUps}
                user_id={userSession.data.user?.id}
                article_id={article.pgrst_scalar.article_id}
                //@ts-ignore
                userUp={UpCount?.articleStat_ups}
                //@ts-ignore
                userDown={DownCount?.articleStat_downs}
              />
              <div>
                {CommentData && (
                  <DrawerComment
                    //@ts-ignore
                    comment={CommentData}
                    article_id={article.pgrst_scalar.article_id}
                    user_id={userSession?.data?.user?.id}
                    openCommend={openCommend}
                  />
                )}
              </div>
            </div>
            <div className="flex space-x-3 items-center">
              {userSession.data.user?.id === article.pgrst_scalar.user_id && (
                <>
                  <Link
                    id="edit-article"
                    href={`/edit/${article.pgrst_scalar.article_id}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1}
                      stroke="currentColor"
                      className="size-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>
                  </Link>
                  <DeleteBtn
                    articleId={article.pgrst_scalar.article_id}
                    articleTitle={article.pgrst_scalar.article_title}
                  />
                </>
              )}
              <InteractBtn
                user_id={userSession.data.user?.id}
                article_id={article.pgrst_scalar.article_id}
                username={userName}
                articleTitle={article.pgrst_scalar.article_title}
              />
            </div>
          </div>
        </div>
        <ArticleContent article={article.pgrst_scalar.article_content} />
        <div className="flex space-x-3 pt-8 pb-10">
          {Tagdata &&
            //@ts-ignore
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
            {article.pgrst_scalar.user_id === userSession.data.user?.id ? (
              <></>
            ) : (
              userSession.data.user && (
                <FollowBtn
                  isFollowing={userFollow}
                  ourUserId={userSession.data.user.id}
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

export default Page;
