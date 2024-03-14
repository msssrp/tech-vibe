import { getArticleByName } from "@/libs/actions/article/article";
import { getUser } from "@/libs/actions/user/user";
import React from "react";
import { redirect } from "next/navigation";
import { convertTime } from "@/libs/convertTime";
import { Badge } from "@mantine/core";
import { getArticleTags } from "@/libs/actions/tag/tag";
import { getUserFollower } from "@/libs/actions/user/user_following";
import getUserSession from "@/libs/actions/user/auth/getSession";
import DrawerComment from "./component/DrawerComment";
import { Metadata } from "next";
import { getCommentOnArticle } from "@/libs/actions/comment/comment";

export async function generateMetadata({
  params,
}: {
  params: { postName: string };
}): Promise<Metadata> {
  const decodeTitle = decodeURIComponent(params.postName);

  const { article } = await getArticleByName(decodeTitle);
  return {
    title: decodeTitle,
    description: article.article_description,
  };
}

const page = async ({ params }: { params: { postName: string } }) => {
  const userSession = await getUserSession();
  if (!userSession.data.user) redirect("/");
  if (!params.postName) redirect("/");
  const decodeTitle = decodeURIComponent(params.postName);
  console.log(decodeTitle);

  const { article } = await getArticleByName(decodeTitle);
  if (!article.created_at || !article.user_id) redirect("/");
  const user = await getUser(article.user_id);
  const { day, month } = convertTime(article.created_at);
  const Tagdata = await getArticleTags(article.article_id);
  const { count: UserFollowers } = await getUserFollower(article.user_id);
  const { data: CommentData } = await getCommentOnArticle(article.article_id);
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
              <img
                src={user.user_profile}
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
                  <button className="text-green-400">follow</button>
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
              <div className="flex space-x-2">
                <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="#616160"
                    className="w-6 h-6">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m15 11.25-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </button>
                <p className="text-[#616160]">331</p>
              </div>
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="#616160"
                  className="w-6 h-6">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m9 12.75 3 3m0 0 3-3m-3 3v-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </button>
              <div>
                {CommentData && (
                  <DrawerComment
                    comment={CommentData}
                    article_id={article.article_id}
                    user_id={userSession.data.user.id}
                  />
                )}
              </div>
            </div>
            <div className="flex space-x-3">
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="#FED556"
                  className="w-6 h-6">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                  />
                </svg>
              </button>
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="#699DF6"
                  className="w-6 h-6">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
                  />
                </svg>
              </button>
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="#616160"
                  className="w-6 h-6">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: article.article_content }}
          className="pt-7"
        />
        <div className="flex space-x-3 pt-6">
          {Tagdata?.tag_name.map((tag: any, index: any) => (
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
              <img
                src={user.user_profile}
                alt={article.article_title}
                className="rounded-full"
              />
            </div>
            <span className="text-lg">{user.user_fullname}</span>
            {UserFollowers && UserFollowers == 1 ? (
              <p>{UserFollowers} Follower</p>
            ) : (
              <p>{UserFollowers} Followers</p>
            )}
          </div>
          <div>
            {article.user_id === userSession.data.user?.id ? (
              <></>
            ) : (
              <button className="btn text-white bg-[#4DAF51] rounded-3xl">
                Follow
              </button>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default page;
