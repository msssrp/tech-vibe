import Link from "next/link";
import React, { useState } from "react";

const CertificateTab = () => {
  return (
    <div className="flex items-center lg:px-9 text-sm lg:text-base">
      <div
        className={`py-3 px-5 lg:px-9 bth hover:bg-[#F2F4FB] border-none rounded-tl-2xl rounded-tr-2xl bg-[#F2F4FB] `}
      >
        Certificates
      </div>
    </div>
  );
};

export default CertificateTab;
