"use client";
import React, { useEffect, useState } from "react";
import { Tabs } from "@mantine/core";
import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa6";
import Link from "next/link";
import ModalName from "./Modals/ModalName";
import ModalGithub from "./Modals/ModalGithub";
import ModalFacebook from "./Modals/ModalFacebook";
import ModalTwitter from "./Modals/ModalTwitter";
import ModalDelete from "./Modals/ModalDelete";
import { userProps, userSocialProps } from "@/types/user/user";
import { getUserSocial } from "@/libs/actions/user/user_social";
import Image from "next/image";

type editProfileProps = {
  user: userProps;
  userFollowerCount: number | null;
};

const EditProfile: React.FC<editProfileProps> = ({
  user,
  userFollowerCount,
}) => {
  const [userSocials, setUserSocials] = useState<userSocialProps>();
  useEffect(() => {
    const getUserSocials = async () => {
      const userSocials = await getUserSocial(user.user_id);
      setUserSocials(userSocials);
    };
    getUserSocials();
  }, [user.user_id]);

  return (
    <div>
      <div className="container mx-auto px-44 py-12">
        <h1 className="font-semibold text-3xl">{user.user_fullname}</h1>
        <div className="mt-6">
          <div className="flex items-center space-x-2 mx-2 sticky top-0 bg-base-100 z-10">
            <div className="w-full">
              <Tabs defaultValue="Home" color="black">
                <Tabs.List h={60}>
                  <Tabs.Tab value="Home" className="font-semibold text-base">
                    Manage account
                  </Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value="Home">
                  <div className="pl-10 pr-7">
                    <div className="py-8 border-b border-[#F2F2F2]">
                      <div className="flex justify-between items-center">
                        <div className="space-y-5">
                          <h2 className="text-xl">{user.user_fullname}</h2>
                          <p className="text-[#606060]">
                            {userFollowerCount}{" "}
                            {userFollowerCount && userFollowerCount > 1
                              ? "Followers"
                              : "Follower"}
                          </p>
                          <div className="social flex space-x-4">
                            <div className="flex items-center">
                              <Link
                                href={
                                  userSocials?.user_social.user_social_github
                                    ? `${userSocials.user_social.user_social_github}`
                                    : "/#"
                                }
                                className="flex items-center"
                              >
                                <FaGithub className="w-7 h-7" />
                              </Link>
                            </div>
                            <div className="flex items-center">
                              <Link
                                href={
                                  userSocials?.user_social.user_social_facebook
                                    ? `${userSocials.user_social.user_social_facebook}`
                                    : "/#"
                                }
                                passHref={true}
                              >
                                <FaFacebook className="w-7 h-7 text-[#1877F2]" />
                              </Link>
                            </div>
                            <div className="flex items-center">
                              <Link
                                href={
                                  userSocials?.user_social.user_social_twitter
                                    ? `${userSocials.user_social.user_social_twitter}`
                                    : "/#"
                                }
                              >
                                <FaSquareXTwitter className="w-7 h-7" />
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="image-user-profile">
                          <div className="avatar">
                            <div className="w-32 rounded-full">
                              <Image
                                src={user.user_profile}
                                alt="TechVibe user"
                                width={128}
                                height={128}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6">
                        {/* email */}
                        <div className="flex justify-between items-center py-2 border-b border-[#F2F2F2]">
                          <p className="font-medium flex items-center h-12">
                            Eamil address
                          </p>
                          <p className="text-[#606060]">{user.user_email}</p>
                        </div>
                        {/* Name */}
                        <div className="flex justify-between items-center py-2 border-b border-[#F2F2F2]">
                          <p className="font-medium">Name</p>
                          <div className="flex items-center ">
                            <p className="text-[#606060]">
                              {user.user_fullname}
                            </p>
                            <ModalName
                              userId={user.user_id}
                              userName={user.user_fullname}
                            />
                          </div>
                        </div>
                        {/* social */}
                        <div className="flex justify-between items-center pt-4">
                          <div className="flex items-center space-x-2">
                            <FaGithub className="w-7 h-7" />
                            <p className="font-medium">Github link</p>
                          </div>
                          <div className="flex items-center">
                            <p className="text-[#606060] italic">
                              {userSocials?.user_social.user_social_github
                                ? userSocials.user_social.user_social_github
                                : "you dont have a github link yet."}
                            </p>
                            <ModalGithub
                              userId={user.user_id}
                              githubLink={
                                userSocials?.user_social.user_social_github
                                  ? userSocials.user_social.user_social_github
                                  : "update github link."
                              }
                            />
                          </div>
                        </div>
                        <div className="flex justify-between items-center my-2">
                          <div className="flex items-center space-x-2">
                            <FaFacebook className="w-7 h-7 text-[#1877F2]" />
                            <p className="font-medium">Facebook link</p>
                          </div>
                          <div className="flex items-center">
                            <p className="text-[#606060] italic">
                              {userSocials?.user_social.user_social_facebook
                                ? userSocials.user_social.user_social_facebook
                                : "you dont have a facebook link yet."}
                            </p>
                            <ModalFacebook
                              userId={user.user_id}
                              facebookLink={
                                userSocials?.user_social.user_social_facebook
                                  ? userSocials.user_social.user_social_facebook
                                  : "update facebook link."
                              }
                            />
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-2">
                            <FaSquareXTwitter className="w-7 h-7" />
                            <p className="font-medium">Twitter link</p>
                          </div>
                          <div className="flex items-center">
                            <p className="text-[#606060] italic">
                              {userSocials?.user_social.user_social_twitter
                                ? userSocials.user_social.user_social_twitter
                                : "you dont have a twitter link yet."}
                            </p>
                            <ModalTwitter
                              userId={user.user_id}
                              twitterLink={
                                userSocials?.user_social.user_social_twitter
                                  ? userSocials.user_social.user_social_twitter
                                  : "update twitter link."
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="pt-8 space-y-4">
                      <ModalDelete userId={user.user_id} />
                      <p className="text-[#C8C2C2]">
                        Permanently delete your account and all of your content.
                      </p>
                    </div>
                  </div>
                </Tabs.Panel>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
