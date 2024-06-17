"use client";
import React, { useState } from "react";
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


const EditProfile = () => {
  return (
    <div>
      <div className="container mx-auto px-44 py-12">
        <h1 className="font-semibold text-3xl">Christopher Campbell</h1>
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
                  <div className="ml-11">
                    <div className="py-10 border-b-2 border-[#F2F2F2]">
                      <div className="flex justify-between items-center">
                        {/* left */}
                        <div className="space-y-5">
                          <h2 className="text-xl">Christopher Campbell</h2>
                          <p className="text-[#606060]">45 Follws</p>
                          <div className="social flex space-x-4">
                            <div className="flex items-center">
                              <Link href="" className="flex items-center">
                                <FaGithub className="w-7 h-7" />
                              </Link>
                            </div>
                            <div className="flex items-center">
                              <Link href="">
                                <FaFacebook className="w-7 h-7 text-[#1877F2]" />
                              </Link>
                            </div>
                            <div className="flex items-center">
                              <Link href="">
                                <FaSquareXTwitter className="w-7 h-7" />
                              </Link>
                            </div>
                          </div>
                        </div>
                        {/* right */}
                        <div className="image-user-profile">
                          <div className="avatar">
                            <div className="w-36 rounded-full">
                              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-6">
                        {/* email */}
                        <div className="flex justify-between items-center h-12">
                          <p className="font-medium">Eamil address</p>
                          <p className="text-[#606060]">Chirtopher@gmail.com</p>
                        </div>
                        {/* Name */}
                        <div className="flex justify-between items-center">
                          <p className="font-medium">Name</p>
                          <div className="flex items-center ">
                            <p className="text-[#606060]">
                              Christopher Campbell
                            </p>
                            <ModalName/>
                          </div>
                        </div>
                        {/* social */}
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-2">
                            <FaGithub className="w-7 h-7" />
                            <p className="font-medium">Github link</p>
                          </div>
                          <div className="flex items-center">
                            <p className="text-[#606060]">Christopher2410</p>
                            <ModalGithub/>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-2">
                            <FaFacebook className="w-7 h-7 text-[#1877F2]" />
                            <p className="font-medium">Facebook link</p>
                          </div>
                          <div className="flex items-center">
                            <p className="text-[#606060]">Christopher</p>
                            <ModalFacebook/>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-2">
                            <FaSquareXTwitter className="w-7 h-7" />
                            <p className="font-medium">Twitter link</p>
                          </div>
                          <div className="flex items-center">
                            <p className="text-[#606060]">Christopher</p>
                            <ModalTwitter/>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="pt-8 space-y-4">
                      <ModalDelete/>
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
