"use client";
import Link from "next/link";
import React, { useState } from "react";

type complaintTabsProps = {
  harassmentTotal: number;
  rulesViolationTotal: number;
  spamTotal: number;
};

const ComplaintTabs: React.FC<complaintTabsProps> = ({
  harassmentTotal,
  rulesViolationTotal,
  spamTotal,
}) => {
  const [isActiveAt, setIsActiveAt] = useState("Harassment");
  return (
    <div className="flex items-center px-9">
      <Link
        href={"/manage/complaint"}
        className={`py-3 px-9 bth hover:bg-[#F2F4FB] border-none rounded-tl-2xl rounded-tr-2xl ${
          isActiveAt === "Harassment" ? "bg-[#F2F4FB]" : "bg-transparent"
        }`}
        onClick={() => setIsActiveAt("Harassment")}>
        Harassment ({harassmentTotal})
      </Link>
      <Link
        href={"/manage/complaint/rules-violation"}
        className={`py-3 px-9 bth hover:bg-[#F2F4FB] border-none rounded-tl-2xl rounded-tr-2xl ${
          isActiveAt === "Rules Violation" ? "bg-[#F2F4FB]" : "bg-transparent"
        }`}
        onClick={() => setIsActiveAt("Rules Violation")}>
        Rules Violation ({rulesViolationTotal})
      </Link>
      <Link
        href={"/manage/complaint/spam"}
        className={`py-3 px-9 bth hover:bg-[#F2F4FB] border-none rounded-tl-2xl rounded-tr-2xl ${
          isActiveAt === "Spam" ? "bg-[#F2F4FB]" : "bg-transparent"
        }`}
        onClick={() => setIsActiveAt("Spam")}>
        Spam ({spamTotal})
      </Link>
    </div>
  );
};

export default ComplaintTabs;
