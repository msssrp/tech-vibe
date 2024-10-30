"use client";
import React from "react";
import SwitchNet from "@/components/web3/SwitchNet";
import CertificateCard from "../certificate/component/CertificateCard";
import useMyCertificate from "./useMyCertificate";

const Page = () => {
  const { isLoading, certificateData } = useMyCertificate();
  return (
    <div className="container mx-auto flex flex-col space-y-9 mt-6 h-screen">
      <div className="w-full flex flex-col space-y-5 justify-center items-center">
        <SwitchNet />
      </div>
      <div className="flex justify-center items-center flex-wrap">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          certificateData.map((result, index) => (
            <CertificateCard
              key={index}
              tokenId={result[0]}
              ipfsUrlHash={result[2]}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Page;
