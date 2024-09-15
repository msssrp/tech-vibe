"use client";
import React from "react";
import { Notifications } from "@mantine/notifications";
import Image from "next/image";
import useCertificateGen from "@/hook/useCertificateGen";
import { updateArticleClaimCertificate } from "@/libs/actions/article/article";

type certiProps = {
  userFullName: string;
  articleName: string;
  certificateImageUrl: string;
  upvote: number;
};
const CertificateGen: React.FC<certiProps> = ({
  userFullName,
  articleName,
  certificateImageUrl,
  upvote,
}) => {
  const { onButtonClick, loadingState } = useCertificateGen(
    articleName,
    userFullName
  );

  return (
    <>
      <Notifications />
      <div className="container mx-auto flex flex-col items-center justify-center space-y-7 mt-6">
        <div className="flex flex-col space-y-3 items-center">
          <span className="text-xl font-semibold">Congratulation 🎉🎉</span>
          <p className="font-semibold">{userFullName}</p>
          <span>youre blog</span>
          <span className="italic">{articleName}</span>
          <span>
            has reached {upvote} Ups. Here is youre certificate from us. Click
            accept to get youre certificate !!
          </span>
        </div>
        <div className="w-[560px] h-[400px] relative" id="content">
          <Image
            width={560}
            height={400}
            src={certificateImageUrl}
            alt="TechVibe-Certificate-Themeplate"
            className="w-full h-full"
          />
          <div className="absolute top-0 left-0 h-full w-full box-border">
            <h1 className="font-semibold text-xl mt-[103px] ml-[85px]">
              Creative of Author
            </h1>
            <p className="text-md font-semibold mt-[50px] ml-[60px]">
              {userFullName}
            </p>
          </div>
        </div>
        <button className="btn bg-green-500 text-white" onClick={onButtonClick}>
          {loadingState}
        </button>
      </div>
    </>
  );
};

export default CertificateGen;
