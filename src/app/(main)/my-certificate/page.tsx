"use client";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import useCertificate from "@/hook/useCertificate";
import SwitchNet from "@/components/web3/SwitchNet";
import CertificateCard from "../certificate/component/CertificateCard";

const Page = () => {
  const { certificateByName, filterdCertificates, certificateData } =
    useCertificate();
  return (
    <div className="container mx-auto flex flex-col space-y-9 mt-6 h-screen">
      <div className="w-full flex flex-col space-y-5 justify-center items-center">
        <SwitchNet />
      </div>
      <div className="flex justify-center items-center flex-wrap">
        {certificateByName && filterdCertificates.length > 0 ? (
          <>
            {filterdCertificates.map((result, index) => (
              <CertificateCard
                key={index}
                tokenId={result[0]}
                ownerAddress={result[1]}
                ownerName={result[2]}
                certificateTitle={result[3]}
                certificateImageHash={result[4]}
              />
            ))}
          </>
        ) : certificateData && certificateByName === "" ? (
          <>
            {certificateData.map((result, index) => (
              <CertificateCard
                key={index}
                tokenId={result[0]}
                ownerAddress={result[1]}
                ownerName={result[2]}
                certificateTitle={result[3]}
                certificateImageHash={result[4]}
              />
            ))}
          </>
        ) : (
          <>
            {filterdCertificates && filterdCertificates.length === 0 && (
              <div>
                <p>No certificate found</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Page;
