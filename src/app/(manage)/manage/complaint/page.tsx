import React from "react";
import ComplaintTabs from "../../component/ComplaintTabs";
import ComplaintStat from "../../component/ComplaintStat";
import {
  getComplaints,
  getComplaintsArticles,
} from "@/libs/actions/complaint/complaint";
import DataTable from "@/components/main/complaintTable/DataTable";

const page = async () => {
  const complaints = await getComplaints();
  const complaintCount = await getComplaintsArticles();

  const complaintIdsToExclude =
    complaintCount &&
    complaintCount.data &&
    complaintCount.data.map((article) => article.article_id);
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
    harassment.filter(
      (complaint) =>
        complaint.complaint_status === "pending" &&
        !complaintIdsToExclude?.includes(complaint.article_id)
    );
  const harassDeleteTotal =
    harassment &&
    harassment.filter(
      (complaint) =>
        complaint.complaint_status === "delete" &&
        !complaintIdsToExclude?.includes(complaint.article_id)
    );

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
            complaint={complaintCount?.count ? complaintCount.count : 0}
            deleteTotal={harassDeleteTotal ? harassDeleteTotal.length : 0}
          />
          <div className="flex flex-col lg:flex-row flex-wrap w-full justify-center items-center mt-10">
            {harassment ? (
              <DataTable complaintWithArticelAndUser={harassment} />
            ) : (
              <span>No Complaint found</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
