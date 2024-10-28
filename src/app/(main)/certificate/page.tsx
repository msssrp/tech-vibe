"use client";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import CertificateCard from "./component/CertificateCard";
import useCertificate from "@/hook/useCertificate";
import SwitchNet from "@/components/web3/SwitchNet";

const Page = () => {
  const {
    setCertificateByName,
    certificateByName,
    filterdCertificates,
    certificateData,
  } = useCertificate();
  return (
    <div className="container mx-auto flex flex-col space-y-9 mt-6 h-screen">
      <div className="w-full flex flex-col space-y-5 justify-center items-center">
        <SwitchNet />
        <div className="w-2/3 mx-auto">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              onChange={(e) => setCertificateByName(e.target.value)}
              className="block w-full p-4 ps-10 text-sm focus:outline-none text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500   "
              placeholder="Search Certificate By Name..."
            />
          </div>
        </div>
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
