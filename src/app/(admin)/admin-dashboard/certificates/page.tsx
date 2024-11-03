"use client";
import React, { useState } from "react";
import DataTable from "@/components/main/certificateTable/DataTable";
import CertificateStat from "./component/CertificateStat";
import CertificateTab from "./component/CertificateTab";
import useCertificate from "@/hook/useCertificate";
import SwitchNetAdmin from "./component/SwitchNetAdmin";

const RPC_URLS = {
  sepolia:
    "https://light-delicate-energy.ethereum-sepolia.quiknode.pro/d37f6796b28cace29d313c06a9565bdb64f06c48",
  bsc: "https://light-delicate-energy.bsc.quiknode.pro/d37f6796b28cace29d313c06a9565bdb64f06c48",
  polygon:
    "https://light-delicate-energy.matic.quiknode.pro/d37f6796b28cace29d313c06a9565bdb64f06c48",
  avalanche:
    "https://light-delicate-energy.avalanche-mainnet.quiknode.pro/d37f6796b28cace29d313c06a9565bdb64f06c48/ext/bc/C/rpc/",
};

const Page = () => {
  const [provider, setProvider] = useState(RPC_URLS.sepolia);
  const { certificateData } = useCertificate(provider, setProvider);

  return (
    <div className="flex flex-col space-y-4">
      {/*Tabs*/}
      <div className="flex flex-col">
        <CertificateTab />
        <div className="min-h-screen bg-[#F4F2FB]">
          <div className="mt-5">
            <SwitchNetAdmin setProvider={setProvider} />
          </div>
          <CertificateStat allCertificates={certificateData.length} />
          <div className="flex flex-col lg:flex-row flex-wrap justify-center items-center mt-5 w-full">
            <DataTable certificates={certificateData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
