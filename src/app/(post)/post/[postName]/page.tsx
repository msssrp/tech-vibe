import { getArticleByName } from "@/libs/actions/article/article";
import React from "react";
import { redirect } from "next/navigation";
import { Badge } from "@mantine/core";
import DrawerComment from "./component/DrawerComment";
import { Metadata } from "next";
import "./post.css";
import UpDownsButton from "./component/UpDownsButton";
import InteractBtn from "./component/InteractBtn";
import FollowText from "./component/FollowText";
import FollowBtn from "./component/FollowBtn";
import Image from "next/image";
import usePost from "@/hook/usePost";
import { increaseArticleViews } from "@/libs/actions/article/articleStat";

export async function generateMetadata({
  params,
}: {
  params: { postName: string };
  searchParams: { commend: boolean };
}): Promise<Metadata> {
  const decode = decodeURIComponent(params.postName);
  const replaced = decode.replace(/-/g, " ");
  const article = await getArticleByName(replaced);
  return {
    title: article.article_title,
    description: article.article_description,
  };
}

const page = async ({
  params,
  searchParams,
}: {
  params: { postName: string };
  searchParams: { commend: string };
}) => {
  if (!params.postName) redirect("/");
  const decode = decodeURIComponent(params.postName);
  const replaced = decode.replace(/-/g, " ");
  const openCommend = searchParams.commend;

  const {
    article,
    userSession,
    user,
    userFollow,
    day,
    month,
    data,
    UpCount,
    DownCount,
    CommentData,
    Tagdata,
    UserFollowers,
  } = await usePost(replaced);
  if (!article.created_at || !article.user_id) redirect("/");

  if (userSession.data.user?.id) {
    await increaseArticleViews(article.article_id, userSession.data.user.id);
  }

  return (
    <div>
      <div className="flex flex-col space-y-2 h-auto container px-64 mx-auto mt-9">
        <div className="flex flex-col space-y-4">
          <div className="font-semibold text-3xl">
            <span>{article.article_title}</span>
          </div>
          <div className="text-[#616160]">
            <span>{article.article_description}</span>
          </div>
          <div className="flex space-x-5 items-center">
            <div className="w-11 h-11">
              <Image
                height={50}
                width={50}
                src={user.user_profile ? user.user_profile : ""}
                className="rounded-full h-full w-full"
                alt={article.article_title}
              />
            </div>
            <div className="flex flex-col space-y-1">
              <div className="flex space-x-4">
                <span className="">{user.user_fullname}</span>
                {article.user_id === userSession.data.user?.id ? (
                  <></>
                ) : (
                  userSession.data.user && (
                    <FollowText
                      isFollowing={userFollow}
                      userIdToFollow={article.user_id}
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
                articleUp={data}
                user_id={userSession.data.user?.id}
                article_id={article.article_id}
                userUp={UpCount?.articleStat_ups}
                userDown={DownCount?.articleStat_downs}
              />
              <div>
                {CommentData && (
                  <DrawerComment
                    comment={CommentData}
                    article_id={article.article_id}
                    user_id={userSession?.data?.user?.id}
                    openCommend={openCommend}
                  />
                )}
              </div>
            </div>
            <div className="flex space-x-3">
              <InteractBtn
                user_id={userSession.data.user?.id}
                article_id={article.article_id}
                url_title={article.article_title}
              />
            </div>
          </div>
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: article.article_content }}
          className="pt-7"
        />
        <div className="flex space-x-3 pt-8 pb-10">
          {Tagdata &&
            Tagdata.tag_name.map((tag: any, index: any) => (
              <Badge
                key={index}
                size="lg"
                autoContrast
                color="rgba(242,242,242)"
                className="text-black">
                {tag}
              </Badge>
            ))}
        </div>
      </div>
      <footer className="bg-[#F5F5F5] mt-5">
        <div className="container mx-auto px-64 flex items-center justify-between py-10 pb-14">
          <div className="flex flex-col space-y-3">
            <div className="w-16 h-16">
              <Image
                width={70}
                height={70}
                src={user.user_profile ? user.user_profile : ""}
                alt={article.article_title}
                className="rounded-full h-full w-full"
              />
            </div>
            <span className="text-lg">{user.user_fullname}</span>
            {UserFollowers && UserFollowers > 1 ? (
              <p>{UserFollowers} Followers</p>
            ) : (
              <p>{UserFollowers} Follower</p>
            )}
          </div>
          <div>
            {article.user_id === userSession.data.user?.id ? (
              <></>
            ) : (
              userSession.data.user && (
                <FollowBtn
                  isFollowing={userFollow}
                  ourUserId={userSession.data.user.id}
                  userIdToFollow={article.user_id}
                />
              )
            )}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default page;
