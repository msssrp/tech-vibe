"use client";
import ComplaintStat from "@/app/(manage)/component/ComplaintStat";
import ComplaintTabs from "@/app/(manage)/component/ComplaintTabs";
import { ComplaintContext } from "@/context/ComplaintContext";
import React, { useContext } from "react";
import ComplaintCard from "../component/ComplaintCard";
import { useSearchParams } from "next/navigation";

const Page = () => {
  const { harassment, rulesViolation, spam } = useContext(ComplaintContext);
  const searchParams = useSearchParams();
  const articleQry = searchParams.get("complaint");
  const spamPendingTotal = spam.filter(
    (complaint) => complaint.complaint_status === "pending"
  );
  const spamComplaintTotal = spam.filter(
    (complaint) => complaint.complaint_status === "complaint"
  );
  const spamDeleteTotal = spam.filter(
    (complaint) => complaint.complaint_status === "delete"
  );

  const filterBySearchParams = spam.filter((complaint) =>
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
          isActiveAt="Spam"
        />
        <div className="min-h-screen bg-[#F4F2FB]">
          <ComplaintStat
            allArticle={spam.length}
            inProgress={spamPendingTotal.length}
            complaint={spamComplaintTotal.length}
            deleteTotal={spamDeleteTotal.length}
            spamTab={true}
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
