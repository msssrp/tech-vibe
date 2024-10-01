import React from "react";
import {
  getComplaints,
  getComplaintsArticles,
} from "@/libs/actions/complaint/complaint";
import ComplaintTabs from "@/app/(manage)/component/ComplaintTabs";
import ComplaintStat from "@/app/(manage)/component/ComplaintStat";
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
  const rulesPendingTotal =
    rulesViolation &&
    rulesViolation.filter(
      (complaint) =>
        complaint.complaint_status === "pending" &&
        !complaintIdsToExclude?.includes(complaint.article_id)
    );

  const rulesDeleteTotal =
    rulesViolation &&
    rulesViolation.filter(
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
          isActiveAt="Rules Violation"
        />
        <div className="min-h-screen bg-[#F4F2FB]">
          <ComplaintStat
            allArticle={rulesViolation ? rulesViolation.length : 0}
            inProgress={rulesPendingTotal ? rulesPendingTotal.length : 0}
            complaint={complaintCount?.count ? complaintCount.count : 0}
            deleteTotal={rulesDeleteTotal ? rulesDeleteTotal.length : 0}
          />
          <div className="flex flex-col lg:flex-row flex-wrap w-full justify-center items-center mt-10">
            {rulesViolation ? (
              <DataTable complaintWithArticelAndUser={rulesViolation} />
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
