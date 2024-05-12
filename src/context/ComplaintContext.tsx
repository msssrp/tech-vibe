import { getComplaints } from "@/libs/actions/complaint/complaint";
import { complaintProps } from "@/types/complaint/complaint";
import { createContext, useEffect, useState } from "react";

export const ComplaintContext = createContext<{
  harassment: complaintProps[];
  rulesViolation: complaintProps[];
  spam: complaintProps[];
}>({ harassment: [], rulesViolation: [], spam: [] });

export const ComplaintProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [complaint, setComplaint] = useState<complaintProps[]>([]);
  useEffect(() => {
    const fetchComplaint = async () => {
      const { data, error } = await getComplaints();
      if (error) return console.log(error);
      setComplaint(data);
    };
    fetchComplaint();
  }, []);
  const harassmentType = complaint.filter(
    (complaint) => complaint.complaint_title === "HARASSMENT"
  );
  const spamType = complaint.filter(
    (complaint) => complaint.complaint_title === "SPAM"
  );
  const rulesViolationType = complaint.filter(
    (complaint) => complaint.complaint_title === "RULES VIOLATION"
  );

  return (
    <ComplaintContext.Provider
      value={{
        harassment: harassmentType,
        spam: spamType,
        rulesViolation: rulesViolationType,
      }}>
      {children}
    </ComplaintContext.Provider>
  );
};
