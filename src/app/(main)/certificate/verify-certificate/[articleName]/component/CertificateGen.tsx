"use client";
import React from "react";
import Image from "next/image";
import useCertificateGen from "@/hook/useCertificateGen";
import SwitchNetWork from "@/components/web3/SwitchNetwork";

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
  const currentTime = new Date();
  const formatDate = (date: Date) => {
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const formattedTime = formatDate(currentTime);
  const { onButtonClick, loadingState } = useCertificateGen(
    articleName,
    userFullName
  );

  return (
    <>
      <SwitchNetWork />
      <div className="container mx-auto flex flex-col items-center justify-center space-y-7 mt-6">
        <div className="flex flex-col space-y-3 items-center">
          <span className="text-xl font-semibold">Congratulations 🎉🎉</span>
          <p className="font-semibold">{userFullName}</p>
          <span>Your article</span>
          <span className="italic">{articleName}</span>
          <span>
            has deeply engaged your readers. Here is your certificate of merit
            for engaging content from us. Click accept to get your certificate.
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
            <p className="text-sm font-semibold mt-[140px] ml-[53px]">
              {userFullName}
            </p>
            <p className="text-xs font-semibold mt-[38px] ml-[53px]">
              {articleName}
            </p>
            <p className="text-[11px] font-semibold mt-[108px] ml-[180px]">
              {formattedTime}
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
