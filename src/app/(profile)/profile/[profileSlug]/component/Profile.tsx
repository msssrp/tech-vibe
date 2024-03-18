"use client";
import React, { useEffect, useState } from "react";
import { articleslist, tag } from "@/components/ui/Items";
import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa6";
import Link from "next/link";
import { userProps } from "@/types/user/user";
import Image from "next/image";
import { getUserFromClient } from "@/libs/actions/user/userClient";
import { getUserFollowerFromClient } from "@/libs/actions/user/user_following";
import ProfileLoading from "@/components/ui/ProfileLoading";
import NameLoading from "@/components/ui/NameLoading";

type profileProps = {
  userId: string;
  sessionUserId: string;
};

const Profile: React.FC<profileProps> = ({ userId, sessionUserId }) => {
  const [userData, setUserData] = useState<userProps>();
  const [userFollower, setUserFollower] = useState<number | null>();
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUserData = async () => {
      const user = await getUserFromClient(userId);
      setUserData(user);
      const userFollow = await getUserFollowerFromClient(userId);
      setUserFollower(userFollow.count);
      setIsLoading(false);
    };
    getUserData();
  }, [userId]);

  const sliceArticleslist = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, articleslist.length);
    return articleslist.slice(startIndex, endIndex);
  };

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

          <div className="social flex justify-center items-center space-x-3">
            <Link href="">
              <FaGithub className="w-6 h-6" />
            </Link>
            <Link href="">
              <FaFacebook className="w-6 h-6 text-[#1877F2]" />
            </Link>
            <Link href="">
              <FaSquareXTwitter className="w-6 h-6" />
            </Link>
          </div>
          {sessionUserId === userId && (
            <button className="btn bg-black text-white rounded-full px-6 py-2">
              Edit
            </button>
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
                      <img src={articleslist.image} />
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
