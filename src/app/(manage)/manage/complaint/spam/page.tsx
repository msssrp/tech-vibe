import React from "react";
import { getComplaints } from "@/libs/actions/complaint/complaint";
import ComplaintTabs from "@/app/(manage)/component/ComplaintTabs";
import ComplaintStat from "@/app/(manage)/component/ComplaintStat";
import DataTable from "@/components/main/complaintTable/DataTable";

const page = async () => {
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
  const spamPendingTotal =
    spam &&
    spam.filter((complaint) => complaint.complaint_status === "pending");
  const spamComplaintTotal =
    spam &&
    spam.filter((complaint) => complaint.complaint_status === "complaint");
  const spamDeleteTotal =
    spam && spam.filter((complaint) => complaint.complaint_status === "delete");

  return (
    <div className="flex flex-col space-y-4">
      {/*Tabs*/}
      <div className="flex flex-col">
        <ComplaintTabs
          harassmentTotal={harassment ? harassment.length : 0}
          rulesViolationTotal={rulesViolation ? rulesViolation.length : 0}
          spamTotal={spam ? spam.length : 0}
          isActiveAt="Spam"
        />
        <div className="min-h-screen bg-[#F4F2FB]">
          <ComplaintStat
            allArticle={spam ? spam.length : 0}
            inProgress={spamPendingTotal ? spamPendingTotal.length : 0}
            complaint={spamComplaintTotal ? spamComplaintTotal.length : 0}
            deleteTotal={spamDeleteTotal ? spamDeleteTotal.length : 0}
          />
          <div className="flex flex-col lg:flex-row flex-wrap w-full justify-center items-center mt-10">
            {spam ? (
              <DataTable complaintWithArticelAndUser={spam} />
            ) : (
              <span>No complaint found</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
