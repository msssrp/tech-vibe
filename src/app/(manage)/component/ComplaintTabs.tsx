import Link from "next/link";
import React, { useState } from "react";

type complaintTabsProps = {
  harassmentTotal: number;
  rulesViolationTotal: number;
  spamTotal: number;
  isActiveAt: string;
};

const ComplaintTabs: React.FC<complaintTabsProps> = ({
  harassmentTotal,
  rulesViolationTotal,
  spamTotal,
  isActiveAt,
}) => {
  return (
    <div className="flex items-center lg:px-9 text-sm lg:text-base">
      <Link
        href={"/manage/complaint"}
        className={`py-3 px-5 lg:px-9 bth hover:bg-[#F2F4FB] border-none rounded-tl-2xl rounded-tr-2xl ${
          isActiveAt === "Harassment" ? "bg-[#F2F4FB]" : "bg-transparent"
        }`}>
        Harassment ({harassmentTotal})
      </Link>
      <Link
        href={"/manage/complaint/rules-violation"}
        className={`py-3 px-5 lg:px-9 bth hover:bg-[#F2F4FB] border-none rounded-tl-2xl rounded-tr-2xl ${
          isActiveAt === "Rules Violation" ? "bg-[#F2F4FB]" : "bg-transparent"
        }`}>
        Rules Violation ({rulesViolationTotal})
      </Link>
      <Link
        href={"/manage/complaint/spam"}
        className={`py-3 px-5 lg:px-9 bth hover:bg-[#F2F4FB] border-none rounded-tl-2xl rounded-tr-2xl ${
          isActiveAt === "Spam" ? "bg-[#F2F4FB]" : "bg-transparent"
        }`}>
        Spam ({spamTotal})
      </Link>
    </div>
  );
};

export default ComplaintTabs;
