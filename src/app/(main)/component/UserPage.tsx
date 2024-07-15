import React from "react";
import RightSection from "@/components/main/RightSection";
import getAllTags from "@/libs/actions/tag/tag";
import DisplayArticle from "./child-component/DisplayArticle";
import FilterDisplayArticle from "./child-component/FilterDisplayArticle";

type userPageProps = {
  user_id: string;
  articleType: string | undefined;
  isTag: string | undefined;
};

const UserPage: React.FC<userPageProps> = async ({
  user_id,
  articleType,
  isTag,
}) => {
  const tags = await getAllTags();
  return (
    <div className="container mx-auto px-5 lg:px-60">
      <div className="flex flex-col lg:flex-row divide-x h-auto relative">
        {/* left */}
        <div className="w-full lg:w-2/3 py-10">
          <FilterDisplayArticle tags={tags} />
          {/* allArticles */}
          <div className="pr-9 h-auto overflow-y-scroll no-scrollbar">
            <DisplayArticle
              userId={user_id}
              articleType={articleType}
              isTag={isTag}
            />
          </div>
        </div>
        {/* right */}
        <RightSection tags={tags} />
      </div>
    </div>
  );
};

export default UserPage;
