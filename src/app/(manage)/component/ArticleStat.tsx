import Link from "next/link";
import React from "react";

type articleStatProps = {
  allArticle: number;
  inProgress: number;
  approve: number;
  disapprove: number;
};

const ArticleStat: React.FC<articleStatProps> = ({
  allArticle,
  inProgress,
  approve,
  disapprove,
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
          {approve}
        </h1>

        <span className="text-sm lg:text-lg">Approve</span>
      </div>
      <div className="h-[100px] w-[350px] lg:h-[160px] lg:w-[220px] flex flex-col justify-center space-y-1 items-center bg-white rounded-xl">
        <h1 className="text-2xl lg:text-6xl font-semibold text-[#E0524C]">
          {disapprove}
        </h1>

        <span className="text-sm lg:text-lg">Disapprove</span>
      </div>
    </div>
  );
};

export default ArticleStat;
