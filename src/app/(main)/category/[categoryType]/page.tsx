import {
  getArticleByTag,
  getNpruArticle,
  getPopularArticles,
} from "@/libs/actions/article/article";
import ArticleCard from "./component/ArticleCard";
import getUserSession from "@/libs/actions/user/auth/getSession";

export default async function page({
  params,
}: {
  params: { categoryType: string };
}) {
  const { data } = await getUserSession();
  if (params.categoryType === "npru-articles") {
    const articles = await getNpruArticle();
    return (
      <div className="container mx-auto min-h-screen w-screen p-10">
        <div className="flex flex-col justify-center items-center">
          <div className="text-lg text-base-content uppercase font-semibold flex items-center space-x-2">
            <h1 className="text-[#606060]">TECHNOLOGY ARTICLES BY </h1>
            <span className="text-red">Npru</span>
          </div>
          <div className="flex flex-col -space-y-5 md:space-y-4 md:flex-wrap md:flex-row items-center justify-center w-full h-full md:space-x-6">
            {articles.map((article) => (
              <ArticleCard
                key={article.article_id}
                article={article}
                userId={data ? data.user?.id : undefined}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
  if (params.categoryType === "popular-articles") {
    const articles = await getPopularArticles();
    return (
      <div className="container mx-auto min-h-screen w-screen p-10">
        <div className="flex flex-col justify-center items-center">
          <div className="text-lg text-base-content uppercase font-semibold flex items-center space-x-2">
            <h1 className="text-[#606060]">TECHNOLOGY ARTICLES BY </h1>
            <span className="text-red">Popular articles</span>
          </div>
          <div className="flex flex-col -space-y-5 md:space-y-4 md:flex-wrap md:flex-row items-center justify-center w-full h-full md:space-x-6">
            {articles &&
              articles.map((article) => (
                <ArticleCard
                  key={article.article_id}
                  article={article}
                  userId={data ? data.user?.id : undefined}
                />
              ))}
          </div>
        </div>
      </div>
    );
  }

  const articles = await getArticleByTag(params.categoryType);
  const tagNameWithoutHypen = params.categoryType.replace(/-/g, " ");
  return (
    <div className="container mx-auto min-h-screen w-screen p-10">
      <div className="flex flex-col justify-center items-center">
        <div className="text-lg text-base-content uppercase font-semibold flex items-center space-x-2">
          <h1 className="text-[#606060]">TECHNOLOGY ARTICLES BY TAG </h1>
          <span className="text-red">{tagNameWithoutHypen}</span>
        </div>
        <div className="flex flex-col -space-y-5 md:space-y-4 md:flex-wrap md:flex-row items-center justify-center w-full h-full md:space-x-6">
          {articles && articles.length > 0 ? (
            articles.map((article) => (
              <ArticleCard
                key={article.article_id}
                article={article}
                userId={data ? data.user?.id : undefined}
              />
            ))
          ) : (
            <p className="mt-10">No article found on this tag</p>
          )}
        </div>
      </div>
    </div>
  );
}
