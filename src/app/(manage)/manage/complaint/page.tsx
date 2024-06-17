"use client";
import React, { useContext } from "react";
import ComplaintTabs from "../../component/ComplaintTabs";
import ComplaintStat from "../../component/ComplaintStat";
import { ComplaintContext } from "@/context/ComplaintContext";
import ComplaintCard from "./component/ComplaintCard";
import { useSearchParams } from "next/navigation";

const Page = () => {
  const { harassment, spam, rulesViolation } = useContext(ComplaintContext);
  const searchParams = useSearchParams();
  const articleQry = searchParams.get("complaint");
  const harassPendingTotal = harassment.filter(
    (complaint) => complaint.complaint_status === "pending"
  );
  const harassComplaintTotal = harassment.filter(
    (complaint) => complaint.complaint_status === "complaint"
  );
  const harassDeleteTotal = harassment.filter(
    (complaint) => complaint.complaint_status === "delete"
  );

  const filterBySearchParams = harassment.filter((complaint) =>
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
          isActiveAt="Harassment"
        />
        <div className="min-h-screen bg-[#F4F2FB]">
          <ComplaintStat
            allArticle={harassment.length}
            inProgress={harassPendingTotal.length}
            complaint={harassComplaintTotal.length}
            deleteTotal={harassDeleteTotal.length}
          />
          <div className="flex flex-col lg:flex-row flex-wrap w-full justify-center items-center mt-10">
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
