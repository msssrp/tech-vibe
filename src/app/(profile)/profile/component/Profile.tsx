"use client";
import React, { useState } from "react";
import { ScrollArea } from "@mantine/core";
import { articleslist, tag } from "@/components/ui/Items";
import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa6";
import Link from "next/link";
import ProfilTabs from "@/components/ui/profile/ProfilTabs";

const Profile = () => {
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);

  const sliceArticleslist = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, articleslist.length);
    return articleslist.slice(startIndex, endIndex);
  };
  return (
    <div className="container mx-auto px-44">
      <div className="flex divide-x h-auto">
        {/* left */}
        <div className="w-2/3 py-10 ">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-3xl font-medium">
              Heather McLeod in Human Parts
            </h2>
          </div>
          <div className="flex items-center space-x-2 mx-2 sticky top-0 bg-base-100 z-10">
              <ProfilTabs/>
          </div>
        </div>
        {/* right */}
        <div className="w-2/6 py-12 pl-11 pr-2 ">
          <div className="flex flex-col items-center">
            <div className="profile text-center space-y-4 mb-12">
              <div className="avatar">
                <div className="w-28 rounded-full">
                  <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>
              </div>
              <h2 className="px-20">Heather McLeod in Human Parts</h2>
              <p className="text-[#606060]">45 Follows</p>
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
              <button className="btn bg-black text-white rounded-full px-6 py-2">
                Edit
              </button>
            </div>
            {/* popularArticles */}
            <div className="w-full space-y-3 mb-6 ">
              <h2 className="uppercase font-semibold text-lg">
                Popular articles
              </h2>
              {sliceArticleslist().map((articleslist) => {
                return (
                  <div className="card-compact bg-[#F8F8F8] rounded-md px-4 ">
                    <div className="card-body">
                      <div className="avatar items-center">
                        <div className="w-8 rounded-full">
                          <img src={articleslist.image} />
                        </div>
                        <p className="ml-2 text-[#606060]">
                          {articleslist.author}
                        </p>
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
      </div>
    </div>
  );
};

export default Profile;
