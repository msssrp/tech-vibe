"use client";
import React from "react";
import InformationSection from "./InformationSection";
import Image from "next/image";
import { Loader, Skeleton } from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import useCertificateData from "./useCertificateSec";
type certificateProps = {
  certificateId: string;
};

const CertificateSec: React.FC<certificateProps> = ({ certificateId }) => {
  const ethereum = typeof window !== "undefined" && window.ethereum;
  const {
    isLoading,
    contractAddress,
    currentUrl,
    certData,
    tokenUrl,
    ownerOfToken,
    error,
  } = useCertificateData(certificateId, ethereum);
  const gateway_url = process.env.NEXT_PUBLIC_GATEWAY_URL as string;
  const clipboard = useClipboard({ timeout: 2000 });

  const certDate = new Date(Number(certData[6]) * 1000);
  const yearCert = certDate.getUTCFullYear().toString();
  const fullDate = `${certDate.getUTCFullYear()}-${
    certDate.getUTCMonth() + 1
  }-${certDate.getUTCDate()}`;

  return (
    <div className="container max-w-[1100px] relative mx-auto flex space-x-7 justify-center">
      {isLoading ? (
        <div className="w-full h-full flex items-center justify-center">
          <Loader size={22} />
        </div>
      ) : (
        <>
          <div>
          </div>
        </>
      )}
    </div>
  );
};

export default CertificateSec;
