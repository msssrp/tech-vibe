import { getArticleByName } from "@/libs/actions/article/article";
import { getUser } from "@/libs/actions/user/user";
import React from "react";
import { redirect } from "next/navigation";
import { Badge } from "@mantine/core";
import { getArticleTags } from "@/libs/actions/tag/tag";
import {
  getUserFollower,
  getUserThatFollowing,
} from "@/libs/actions/user/user_following";
import getUserSession from "@/libs/actions/user/auth/getSession";
import DrawerComment from "./component/DrawerComment";
import { Metadata } from "next";
import { getCommentOnArticle } from "@/libs/actions/comment/comment";
import { convertTime } from "@/libs/convertTime";
import "./post.css";
import {
  getArticleUps,
  getUserDowns,
  getUserUps,
  increaseArticleViews,
} from "@/libs/actions/article/articleStat";
import UpDownsButton from "./component/UpDownsButton";
import InteractBtn from "./component/InteractBtn";
import FollowText from "./component/FollowText";
import FollowBtn from "./component/FollowBtn";
import Image from "next/image";
export async function generateMetadata({
  params,
}: {
  params: { postName: string };
}): Promise<Metadata> {
  const decode = decodeURIComponent(params.postName);
  const replaced = decode.replace(/-/g, " ");

  const article = await getArticleByName(replaced);
  return {
    title: article.article_title,
    description: article.article_description,
  };
}

const page = async ({ params }: { params: { postName: string } }) => {
  const userSession = await getUserSession();
  if (!params.postName) redirect("/");
  const decode = decodeURIComponent(params.postName);
  const replaced = decode.replace(/-/g, " ");

  const article = await getArticleByName(replaced);
  if (!article.created_at || !article.user_id) redirect("/");
  const user = await getUser(article.user_id);
  const { day, month } = convertTime(article.created_at);
  const Tagdata = await getArticleTags(article.article_id);
  const { count: UserFollowers } = await getUserFollower(article.user_id);
  const { data: CommentData } = await getCommentOnArticle(article.article_id);
  const { count: userFollow } = await getUserThatFollowing(
    article.user_id,
    userSession?.data?.user?.id
  );
  if (userSession.data.user?.id) {
    await increaseArticleViews(article.article_id, userSession.data.user.id);
  }
  const { data } = await getArticleUps(article.article_id);
  const UpCount = await getUserUps(
    article.article_id,
    userSession.data.user?.id
  );

  const DownCount = await getUserDowns(
    article.article_id,
    userSession.data.user?.id
  );

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
