import ComplaintStat from "../../component/ComplaintStat";
import ComplaintTabs from "../../component/ComplaintTabs";

export default async function ComplaintLayout({
  children,
  searchParams,
}: {
  children: React.ReactNode;
  searchParams: { complaint: string };
}) {
  return (
    <div className="flex flex-col space-y-4">
      {/*Tabs*/}
      <div className="flex flex-col">
        <ComplaintTabs
          harassmentTotal={1}
          rulesViolationTotal={1}
          spamTotal={1}
        />
        <div className="min-h-screen bg-[#F4F2FB]">
          <ComplaintStat
            allArticle={1}
            inProgress={2}
            complaint={3}
            deleteTotal={2}
          />
          <div className="flex flex-wrap w-full justify-center items-center mt-5">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
