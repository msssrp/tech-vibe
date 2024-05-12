import Link from "next/link";
import React from "react";

type complaintStatProps = {
  allArticle: number;
  inProgress: number;
  complaint: number;
  deleteTotal: number;
  rulesViolationTab?: boolean;
  spamTab?: boolean;
};

const ComplaintStat: React.FC<complaintStatProps> = ({
  allArticle,
  inProgress,
  complaint,
  deleteTotal,
  rulesViolationTab,
  spamTab,
}) => {
  return (
    <div className="flex items-center justify-center space-x-6 mt-11">
      <div className="h-[160px] w-[220px] flex flex-col justify-center space-y-1 items-center bg-white rounded-xl">
        <h1 className="text-6xl font-semibold text-blue-500">{allArticle}</h1>
        <span>All articles</span>
      </div>
      <Link
        href={`${
          rulesViolationTab
            ? "/manage/complaint/rules-violation?complaint=pending"
            : spamTab
            ? "/manage/complaint/spam?complaint=pending"
            : "/manage/complaint?complaint=pending"
        }`}
        className="h-[160px] w-[220px] flex flex-col justify-center space-y-1 items-center bg-white rounded-xl">
        <h1 className="text-6xl font-semibold text-orange-500">{inProgress}</h1>
        <span>In progress</span>
      </Link>
      <Link
        href={`${
          rulesViolationTab
            ? "/manage/complaint/rules-violation?complaint=complaint"
            : spamTab
            ? "/manage/complaint/spam?complaint=complaint"
            : "/manage/complaint?complaint=complaint"
        }`}
        className="h-[160px] w-[220px] flex flex-col justify-center space-y-1 items-center bg-white rounded-xl">
        <h1 className="text-6xl font-semibold text-green-500">{complaint}</h1>
        <span>Complaint</span>
      </Link>
      <Link
        href={`${
          rulesViolationTab
            ? "/manage/complaint/rules-violation?complaint=delete"
            : spamTab
            ? "/manage/complaint/spam?complaint=delete"
            : "/manage/complaint?complaint=delete"
        }`}
        className="h-[160px] w-[220px] flex flex-col justify-center space-y-1 items-center bg-white rounded-xl">
        <h1 className="text-6xl font-semibold text-[#E0524C]">{deleteTotal}</h1>
        <span>Delete</span>
      </Link>
    </div>
  );
};

export default ComplaintStat;
