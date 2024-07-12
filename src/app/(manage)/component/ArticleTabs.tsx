import Link from "next/link";
import React from "react";
type articleTabProps = {
  generalArticleNumber: number;
  npruArticleNumber: number;
  isActiveAt: string;
};
const ArticleTabs: React.FC<articleTabProps> = ({
  generalArticleNumber,
  npruArticleNumber,
  isActiveAt,
}) => {
  return (
    <div className="flex items-center lg:px-9 text-sm lg:text-base">
      <Link
        href={"/manage"}
        className={`py-3 px-5 lg:px-9 bth hover:bg-[#F2F4FB] border-none rounded-tl-2xl rounded-tr-2xl ${
          isActiveAt === "Gerneral articles" ? "bg-[#F2F4FB]" : "bg-transparent"
        }`}
      >
        Gerneral articles ({generalArticleNumber})
      </Link>
      <Link
        href={"/manage/npru-article"}
        className={`py-3 px-5 lg:px-9 bth hover:bg-[#F2F4FB] border-none rounded-tl-2xl rounded-tr-2xl ${
          isActiveAt === "Article from npru" ? "bg-[#F2F4FB]" : "bg-transparent"
        }`}
      >
        Article from npru ({npruArticleNumber})
      </Link>
    </div>
  );
};

export default ArticleTabs;
