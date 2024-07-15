import {
  getNpruArticleOnUserPage,
  getPopularArticles,
} from "@/libs/actions/article/article";
import Link from "next/link";
import RightArticleCard from "./rightSectionComponent/RightArticleCard";

type RightSectionProps = {
  tags: {
    tag_name: string;
  }[];
};

const RightSection: React.FC<RightSectionProps> = async ({ tags }) => {
  const popularArticles = await getPopularArticles(4);
  const npruArticles = await getNpruArticleOnUserPage();
  return (
    <div className="w-full border-l border-white lg:border-neutral-200 lg:w-2/6 lg:py-12 lg:pl-11 pr-2 flex flex-col items-center relative">
      {/* popularArticles */}
      <div className="w-full space-y-3 mb-6 ">
        <h2 className="uppercase font-semibold text-md">Popular articles</h2>
        {popularArticles &&
          popularArticles.map((articleslist) => {
            return (
              <RightArticleCard
                key={articleslist.article_id}
                article={articleslist}
              />
            );
          })}
        <div className="text-center pt-3">
          <Link
            href="/category/popular-articles"
            className="underline cursor-pointer text-sm"
          >
            show more
          </Link>
        </div>
      </div>
      {/* npruArticles */}
      <div className="w-full space-y-3 mt-3 mb-6 sticky top-14">
        <h2 className="uppercase font-semibold text-md">
          Technology articles By NPRU
        </h2>
        {npruArticles.map((articleslist) => {
          return (
            <RightArticleCard
              key={articleslist.article_id}
              article={articleslist}
            />
          );
        })}
        <div className="text-center pt-3">
          <Link
            href="/category/npru-articles"
            className="underline cursor-pointer text-sm"
          >
            show more
          </Link>
        </div>
        {/* populartag */}
        <div className="w-full">
          <h2 className="uppercase font-semibold text-md">Popular tag</h2>
          <div className="mt-2 ">
            {tags.map((tag, index) => {
              const tagWithHypen = tag.tag_name.replace(/ /g, "-");
              return (
                <Link
                  href={`/category/${tagWithHypen}`}
                  key={index}
                  className={`btn btn-sm badge bg-[#f2f2f2] rounded-full m-1`}
                >
                  <p>{tag.tag_name}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSection;
