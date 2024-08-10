import React from "react";

type complaintStatProps = {
  allArticle: number;
  inProgress: number;
  complaint: number;
  deleteTotal: number;
};

const ComplaintStat: React.FC<complaintStatProps> = ({
  allArticle,
  inProgress,
  complaint,
  deleteTotal,
}) => {
  return (
    <div className="flex items-center justify-center space-x-6 mt-11">
      <div className="h-[100px] w-[350px] lg:h-[160px] lg:w-[220px] flex flex-col justify-center space-y-1 items-center bg-white rounded-xl">
        <h1 className="text-2xl lg:text-6xl font-semibold text-blue-500">
          {allArticle}
        </h1>
        <span className="text-sm lg:text-lg">All articles</span>
      </div>
      <div className="h-[100px] w-[350px] lg:h-[160px] lg:w-[220px] flex flex-col justify-center space-y-1 items-center bg-white rounded-xl">
        <h1 className="text-2xl lg:text-6xl font-semibold text-orange-500">
          {inProgress}
        </h1>
        <span className="text-sm lg:text-lg">In progress</span>
      </div>
      <div className="h-[100px] w-[350px] lg:h-[160px] lg:w-[220px] flex flex-col justify-center space-y-1 items-center bg-white rounded-xl">
        <h1 className="text-2xl lg:text-6xl font-semibold text-green-500">
          {complaint}
        </h1>
        <span className="text-sm lg:text-lg">Complaint</span>
      </div>
      <div className="h-[100px] w-[350px] lg:h-[160px] lg:w-[220px] flex flex-col justify-center space-y-1 items-center bg-white rounded-xl">
        <h1 className="text-2xl lg:text-6xl font-semibold text-[#E0524C]">
          {deleteTotal}
        </h1>
        <span className="text-sm lg:text-lg">Delete</span>
      </div>
    </div>
  );
};

export default ComplaintStat;
