import React from "react";
import { articleslist, tag } from "@/components/ui/Items";
import AllArticleCard from "@/components/main/AllArticleCard";
import RightSection from "@/components/main/RightSection";
import { getArticles } from "@/libs/actions/article/article";

type userPageProps = {
  user_id: string;
};

const UserPage: React.FC<userPageProps> = async ({ user_id }) => {
  const articles = await getArticles();

  return (
    <div className="container mx-auto px-44">
      <div className="flex divide-x h-auto relative">
        {/* left */}
        <div className="w-2/3 py-10">
          <div className="flex items-center space-x-2 border-b px-2 sticky top-0 bg-base-100 z-10">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-circle btn-ghost hover:bg-white ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.0}
                  stroke="currentColor"
                  className="w-7 h-7">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-3 shadow bg-base-100 rounded-box w-96 flex flex-row">
                {tag.map((tag) => {
                  return (
                    <button
                      key={tag.tag_id}
                      className={`btn btn-sm rounded-full badge bg-[#F2F2F2] text-[15px] mx-1 my-0.5`}>
                      <p>{tag.tag_name}</p>
                    </button>
                  );
                })}
              </ul>
            </div>
            <div className="topic">
              <button className="btn btn-ghost w-28 px-2 text-md hover:bg-white text-[#606060] hover:text-black">
                All articles
              </button>
            </div>
            <div className="topic">
              <button className="btn btn-ghost px-2 hover:bg-white text-md text-[#606060] hover:text-black">
                Following
              </button>
            </div>
            <div className="selected-tag border-l pl-6 line-clamp-1">
              {tag.map((tag) => {
                return (
                  <button
                    key={tag.tag_id}
                    className={`badge bg-[#F2F2F2] text-black text-[15px] py-3 mr-1`}>
                    <p>{tag.tag_name}</p>
                  </button>
                );
              })}
            </div>
          </div>
          {/* allArticles */}
          <div className="pr-11 h-auto overflow-y-scroll no-scrollbar">
            <div className="space-y-2 ">
              {articles.map((articleslist) => {
                return (
                  <AllArticleCard
                    key={articleslist.article_id}
                    article={articleslist}
                    user_id={user_id}
                  />
                );
              })}
            </div>
          </div>
        </div>
        {/* right */}
        <RightSection articleslist={articleslist} />
      </div>
    </div>
  );
};

export default UserPage;
