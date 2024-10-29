"use client";
import React from "react";
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
    <div className="container mx-auto flex flex-col space-y-9 mt-6 h-screen"></div>
  );
};

export default Page;
