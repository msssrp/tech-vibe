"use client";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import contractABI from "@/reviewAbi.json";
import CertificateCard from "./component/CertificateCard";

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string;
const page = () => {
  const [certificateData, setCertificateData] = useState([]);
  const ethereum = window.ethereum;
  useEffect(() => {
    const getCert = async () => {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      const from = accounts[0];
      const provider = new ethers.BrowserProvider(ethereum);
      const runner = await provider.getSigner(from);
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        runner
      );
      const result = await contract.getAllCertificates();
      setCertificateData(result);
    };
    getCert();
  }, []);

  return (
    <div className="container mx-auto flex flex-col space-y-9 mt-6">
      <div className="w-full flex justify-center items-center">
        <form className="w-2/3 mx-auto">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20">
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 ps-10 text-sm focus:outline-none text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500   "
              placeholder="Search Certificate By Name..."
            />
          </div>
        </form>
      </div>
      <div className="flex justify-center items-center flex-wrap">
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
      </div>
    </div>
  );
};

export default page;
