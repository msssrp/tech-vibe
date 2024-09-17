import Link from "next/link";
import React from "react";

type articleStatProps = {
  allArticle: number;
  inProgress: number;
  approve: number;
  disapprove: number;
  complanint: number;
};

const ArticleStat: React.FC<articleStatProps> = ({
  allArticle,
  inProgress,
  approve,
  disapprove,
  complanint,
}) => {
  return (
    <div className="flex sm:items-center sm:justify-center space-x-2 sm:space-x-6 mt-11 bg-[#F4F2FB] w-full">
      <div className="h-[100px] w-[350px] lg:h-[160px] lg:w-[220px] flex flex-col justify-center space-y-1 items-center bg-white rounded-xl">
        <h1 className="text-2xl lg:text-6xl font-semibold text-blue-500">
          {allArticle}
        </h1>
        <span className="text-sm lg:text-lg text-nowrap px-2">All articles</span>
      </div>

      <div className="h-[100px] w-[350px] lg:h-[160px] lg:w-[220px] flex flex-col justify-center space-y-1 items-center bg-white rounded-xl">
        <h1 className="text-2xl lg:text-6xl font-semibold text-yellow-500">
          {inProgress}
        </h1>
        <span className="text-sm lg:text-lg text-nowrap px-2">In progress</span>
      </div>

      <div className="h-[100px] w-[350px] lg:h-[160px] lg:w-[220px] flex flex-col justify-center space-y-1 items-center bg-white rounded-xl">
        <h1 className="text-2xl lg:text-6xl font-semibold text-green-500">
          {approve}
        </h1>
        <span className="text-sm lg:text-lg text-nowrap px-2">Approved</span>
      </div>

      <div className="h-[100px] w-[350px] lg:h-[160px] lg:w-[220px] flex flex-col justify-center space-y-1 items-center bg-white rounded-xl">
        <h1 className="text-2xl lg:text-6xl font-semibold text-[#E0524C]">
          {disapprove}
        </h1>
        <span className="text-sm lg:text-lg text-nowrap px-2">Disapproved</span>
      </div>

      <div className="h-[100px] w-[350px] lg:h-[160px] lg:w-[220px] flex flex-col justify-center space-y-1 items-center bg-white rounded-xl">
        <h1 className="text-2xl lg:text-6xl font-semibold text-orange-500">
          {complanint}
        </h1>
        <span className="text-sm lg:text-lg text-nowrap px-2">Complainted</span>
      </div>
    </div>
  );
};

export default ArticleStat;
