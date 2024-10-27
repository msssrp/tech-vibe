import Link from "next/link";
import React from "react";

type certificateStatProps = {
  allCertificates: number | null | undefined;
};

const CertificateStat: React.FC<certificateStatProps> = ({
  allCertificates,
}) => {
  return (
    <div className="flex items-center justify-center space-x-6 mt-11">
      <div className="h-[100px] w-[350px] lg:h-[160px] lg:w-[220px] flex flex-col justify-center space-y-1 items-center bg-white rounded-xl">
        <h1 className="text-2xl lg:text-6xl font-semibold text-blue-500">
          {allCertificates}
        </h1>
        <span className="text-sm lg:text-lg">All Certificates</span>
      </div>
    </div>
  );
};

export default CertificateStat;
