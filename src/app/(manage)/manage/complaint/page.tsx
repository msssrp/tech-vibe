import React, { useContext } from "react";
import ComplaintTabs from "../../component/ComplaintTabs";
import ComplaintStat from "../../component/ComplaintStat";
import { ComplaintContext } from "@/context/ComplaintContext";
import ComplaintCard from "./component/ComplaintCard";
import { useSearchParams } from "next/navigation";
import { getComplaints } from "@/libs/actions/complaint/complaint";

const page = async ({
  searchParams,
}: {
  searchParams: { complaint: string };
}) => {
  const complaints = await getComplaints();
  const harassment =
    complaints &&
    complaints.filter(
      (complaint) => complaint.complaint_title === "HARASSMENT"
    );
  const rulesViolation =
    complaints &&
    complaints.filter(
      (complaint) => complaint.complaint_title === "RULES VIOLATION"
    );
  const spam =
    complaints &&
    complaints.filter((complaint) => complaint.complaint_title === "SPAM");
  const harassPendingTotal =
    harassment &&
    harassment.filter((complaint) => complaint.complaint_status === "pending");
  const harassComplaintTotal =
    harassment &&
    harassment.filter(
      (complaint) => complaint.complaint_status === "complaint"
    );
  const harassDeleteTotal =
    harassment &&
    harassment.filter((complaint) => complaint.complaint_status === "delete");

  const filterBySearchParams =
    harassment &&
    harassment.filter((complaint) => {
      if (searchParams && searchParams.complaint) {
        return complaint.complaint_status === searchParams.complaint;
      }
      return complaint.complaint_status === "pending";
    });
  return (
    <div className="flex flex-col space-y-4">
      {/*Tabs*/}
      <div className="flex flex-col">
        <ComplaintTabs
          harassmentTotal={harassment ? harassment.length : 0}
          rulesViolationTotal={rulesViolation ? rulesViolation.length : 0}
          spamTotal={spam ? spam.length : 0}
          isActiveAt="Harassment"
        />
        <div className="min-h-screen bg-[#F4F2FB]">
          <ComplaintStat
            allArticle={harassment ? harassment.length : 0}
            inProgress={harassPendingTotal ? harassPendingTotal.length : 0}
            complaint={harassComplaintTotal ? harassComplaintTotal.length : 0}
            deleteTotal={harassDeleteTotal ? harassDeleteTotal.length : 0}
          />
          <div className="flex flex-col lg:flex-row flex-wrap w-full justify-center items-center mt-10">
            {filterBySearchParams && filterBySearchParams.length > 0 ? (
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

export default page;
