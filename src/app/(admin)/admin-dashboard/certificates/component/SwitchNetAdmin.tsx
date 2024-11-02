"use client";
import {
  CertificateContext,
  RPC_URLS,
} from "@/app/(main)/certificate/context/Certificate";
import { ethers } from "ethers";
import React, { useContext } from "react";

type SwtichNetAdminProps = {
  setProvider: (provider: string) => void;
};

const SwitchNetAdmin: React.FC<SwtichNetAdminProps> = ({ setProvider }) => {
  const [activeProvider, setActiveProvider] = React.useState<string>("sepolia");

  const handleSwitch = (network: string) => {
    setActiveProvider(network);
    switch (network) {
      case "avalanche":
        setProvider(RPC_URLS.avalanche);
        break;
      case "polygon":
        setProvider(RPC_URLS.polygon);
        break;
      default:
        setProvider(RPC_URLS.sepolia);
    }
  };

  return (
    <div className="flex items-center space-x-4 flex-wrap justify-center">
      <button
        onClick={() => handleSwitch("sepolia")}
        className={`btn btn-sm mt-5 border-b-2 transition-all duration-300 ease-in-out ${
          activeProvider === "sepolia"
            ? "border-purple-600 shadow-md shadow-purple-500"
            : "border-transparent"
        }`}
      >
        Switch to Sepolia
      </button>
      <button
        onClick={() => handleSwitch("polygon")}
        className={`btn btn-sm mt-5 border-b-2 transition-all duration-300 ease-in-out ${
          activeProvider === "polygon"
            ? "border-purple-600 shadow-md shadow-purple-500"
            : "border-transparent"
        }`}
      >
        Switch to Polygon
      </button>
      <button
        onClick={() => handleSwitch("avalanche")}
        className={`btn btn-sm mt-5 border-b-2 transition-all duration-300 ease-in-out ${
          activeProvider === "avalanche"
            ? "border-purple-600 shadow-md shadow-purple-500"
            : "border-transparent"
        }`}
      >
        Switch to Avalanche
      </button>
    </div>
  );
};

export default SwitchNetAdmin;
