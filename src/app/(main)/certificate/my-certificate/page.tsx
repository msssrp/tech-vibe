"use client";
import React, { useContext } from "react";
import SwitchNet from "@/components/web3/SwitchNet";
import CertificateCard from "../component/CertificateCard";
import useMyCertificate from "./useMyCertificate";
import { CertificateContext } from "../context/Certificate";
import SwitchNetWork from "@/components/web3/SwitchNetwork";

const Page = () => {
  const { provider } = useContext(CertificateContext);
  const { isLoading, certificateData } = useMyCertificate();
  return (
    <div className="container mx-auto flex flex-col space-y-9 mt-6 h-screen">
      <div className="w-full flex flex-col space-y-5 justify-center items-center">
        <SwitchNetWork />
      </div>
      <div className="flex justify-center items-center flex-wrap">
        {isLoading ? (
          <div>Loading...</div>
        ) : certificateData && certificateData.length > 0 ? (
          certificateData.map((result, index) => (
            <CertificateCard
              key={index}
              tokenId={result[0]}
              ipfsUrlHash={result[2]}
            />
          ))
        ) : (
          <div>
            There is no certificate available on this chain, please switch to
            another chain
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
