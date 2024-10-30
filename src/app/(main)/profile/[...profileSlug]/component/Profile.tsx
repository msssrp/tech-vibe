import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";
import { userProps } from "@/types/user/user";
import { articleProps } from "@/types/article/article";
import RightArticleCard from "@/components/main/rightSectionComponent/RightArticleCard";
import FollowBtn from "@/app/(main)/(post)/[user]/[post_id]/component/FollowBtn";
import { getUserThatFollowing } from "@/libs/actions/user/user_following";
import { getUserSocial } from "@/libs/actions/user/user_social";

type profileProps = {
  user: userProps;
  sessionUserId: string;
  userFollower: number | null;
  popularArticles: articleProps[] | undefined;
};

const Profile: React.FC<profileProps> = async ({
  user,
  sessionUserId,
  userFollower,
  popularArticles,
}) => {
  const { count: userFollow } = await getUserThatFollowing(
    user.user_id,
    sessionUserId
  );
  const { user_social } = await getUserSocial(user.user_id);
  return (
    <div className="lg:w-2/6 py-8 lg:py-12 lg:pl-11 lg:pr-2 ">
      <div className="flex flex-col items-center">
        <div className="profile text-center space-y-4 mb-5">
          <div className="avatar">
            <div className="w-28 rounded-full">
              <Image
                width={120}
                height={120}
                src={user.user_profile}
                alt={"User"}
              />
            </div>
          </div>

          <h2 className="px-20">{user.user_fullname}</h2>
          {userFollower && userFollower > 1 ? (
            <p className="text-[#606060]">{userFollower} Followers</p>
          ) : (
            <p className="text-[#606060]">{userFollower} Follower</p>
          )}
          <div className="social flex space-x-3 justify-center items-center">
            <div className="flex items-center">
              <Link
                href={
                  user_social.user_social_github
                    ? user_social.user_social_github
                    : "/#"
                }
                className="flex items-center"
              >
                <FaGithub className="w-8 h-8" />
              </Link>
            </div>
            <div className="flex items-center">
              <Link
                href={
                  user_social.user_social_facebook
                    ? user_social.user_social_facebook
                    : "/#"
                }
              >
                <FaFacebook className="w-8 h-8 text-[#1877F2]" />
              </Link>
            </div>
            <div className="flex items-center">
              <Link
                href={
                  user_social.user_social_twitter
                    ? user_social.user_social_twitter
                    : "/#"
                }
              >
                <FaSquareXTwitter className="w-8 h-8" />
              </Link>
            </div>
          </div>
          {user.user_id === sessionUserId ? (
            <Link
              href={`/profile/edit-profile`}
              className="btn bg-black text-white text-base rounded-full px-6 py-2"
            >
              Edit
            </Link>
          ) : (
            <FollowBtn
              isFollowing={userFollow}
              ourUserId={sessionUserId}
              userIdToFollow={user.user_id}
            />
          )}
        </div>
        {/* popularArticles */}
        <div className="w-full space-y-3 mb-6 ">
          <h2 className="uppercase font-semibold text-lg">Popular articles</h2>
          {popularArticles &&
            popularArticles.map((articleslist) => {
              return (
                <RightArticleCard
                  article={articleslist}
                  key={articleslist.article_id}
                />
              );
            })}
          <div className="text-center pt-3">
            <Link
              href="/category/popular-articles"
              className="underline cursor-pointer "
            >
              show more
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
