"use client";
import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";
import ProfileLoading from "@/components/ui/ProfileLoading";
import NameLoading from "@/components/ui/NameLoading";
import useProfile from "@/hook/useProfile";

type profileProps = {
  userId: string;
  sessionUserId: string;
};

const Profile: React.FC<profileProps> = ({ userId, sessionUserId }) => {
  const { isLoading, userData, userFollower, sliceArticleslist } =
    useProfile(userId);

  return (
    <div className="w-2/6 py-12 pl-11 pr-2 ">
      <div className="flex flex-col items-center">
        <div className="profile text-center space-y-4 mb-12">
          <div className="avatar">
            <div className="w-28 rounded-full">
              {isLoading ? (
                <ProfileLoading />
              ) : (
                <Image
                  width={120}
                  height={120}
                  src={userData ? userData.user_profile : ""}
                  alt={"User"}
                />
              )}
            </div>
          </div>
          {isLoading ? (
            <NameLoading />
          ) : (
            <h2 className="px-20">{userData?.user_fullname}</h2>
          )}
          {isLoading ? (
            <NameLoading />
          ) : userFollower && userFollower > 1 ? (
            <p className="text-[#606060]">{userFollower} Followers</p>
          ) : (
            <p className="text-[#606060]">{userFollower} Follower</p>
          )}
          <div className="social flex space-x-3 justify-center items-center">
            <div className="flex items-center">
              <Link href="" className="flex items-center">
                <FaGithub className="w-8 h-8" />
              </Link>
            </div>
            <div className="flex items-center">
              <Link href="">
                <FaFacebook className="w-8 h-8 text-[#1877F2]" />
              </Link>
            </div>
            <div className="flex items-center">
              <Link href="">
                <FaSquareXTwitter className="w-8 h-8" />
              </Link>
            </div>
          </div>
          {userId === sessionUserId && (
            <Link
              href={`/profile/edit-profile`}
              className="btn bg-black text-white text-base rounded-full px-6 py-2">
              Edit
            </Link>
          )}
        </div>
        {/* popularArticles */}
        <div className="w-full space-y-3 mb-6 ">
          <h2 className="uppercase font-semibold text-lg">Popular articles</h2>
          {sliceArticleslist().map((articleslist) => {
            return (
              <div
                key={articleslist.id}
                className="card-compact bg-[#F8F8F8] rounded-md px-4 ">
                <div className="card-body">
                  <div className="avatar items-center">
                    <div className="w-8 rounded-full">
                      <Image
                        src={articleslist.image}
                        alt={articleslist.title}
                        width={50}
                        height={50}
                      />
                    </div>
                    <p className="ml-2 text-[#606060]">{articleslist.author}</p>
                  </div>
                  <div className="card-title line-clamp-2">
                    <p className="font-normal text-base">
                      {articleslist.title}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="text-center pt-3">
            <a href="#" className="underline cursor-pointer ">
              show more
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;