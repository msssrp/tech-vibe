"use client";
import ComplaintStat from "@/app/(manage)/component/ComplaintStat";
import ComplaintTabs from "@/app/(manage)/component/ComplaintTabs";
import { ComplaintContext } from "@/context/ComplaintContext";
import React, { useContext } from "react";
import ComplaintCard from "../component/ComplaintCard";
import { useSearchParams } from "next/navigation";

const Page = () => {
  const { harassment, spam, rulesViolation } = useContext(ComplaintContext);
  const searchParams = useSearchParams();
  const articleQry = searchParams.get("complaint");
  const rulesPendingTotal = rulesViolation.filter(
    (complaint) => complaint.complaint_status === "pending"
  );
  const rulesComplaintTotal = rulesViolation.filter(
    (complaint) => complaint.complaint_status === "complaint"
  );
  const rulesDeleteTotal = rulesViolation.filter(
    (complaint) => complaint.complaint_status === "delete"
  );
  const filterBySearchParams = rulesViolation.filter((complaint) =>
    articleQry
      ? complaint.complaint_status === articleQry
      : complaint.complaint_status === "pending"
  );
  return (
    <div className="flex flex-col space-y-4">
      {/*Tabs*/}
      <div className="flex flex-col">
        <ComplaintTabs
          harassmentTotal={harassment.length}
          rulesViolationTotal={rulesViolation.length}
          spamTotal={spam.length}
          isActiveAt="Rules Violation"
        />
        <div className="min-h-screen bg-[#F4F2FB]">
          <ComplaintStat
            allArticle={rulesViolation.length}
            inProgress={rulesPendingTotal.length}
            complaint={rulesComplaintTotal.length}
            deleteTotal={rulesDeleteTotal.length}
            rulesViolationTab={true}
          />
          <div className="flex flex-wrap w-full justify-center items-center mt-10">
            {filterBySearchParams.length > 0 ? (
              filterBySearchParams.map((complaint) => (
                <ComplaintCard
                  key={complaint.complaint_id}
                  complaint={complaint}
                />
              ))
            ) : (
              <div>no complaint on this status yet</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
