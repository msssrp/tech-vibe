"use client";
import React from "react";
import DataTable from "@/components/main/certificateTable/DataTable";
import CertificateStat from "./component/CertificateStat";
import CertificateTab from "./component/CertificateTab";
import useCertificate from "@/hook/useCertificate";
import SwitchNet from "@/components/web3/SwitchNet";

const Page = () => {
  const { certificateData } = useCertificate();

  return (
    <div className="flex flex-col space-y-4">
      {/*Tabs*/}
      <div className="flex flex-col">
        <CertificateTab />
        <div className="min-h-screen bg-[#F4F2FB]">
          <div className="mt-5">
            <SwitchNet />
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
