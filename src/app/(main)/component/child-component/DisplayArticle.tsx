import AllArticleCard from "@/components/main/AllArticleCard";
import {
  getArticles,
  getFollowingArticle,
  getArticleByTag,
  getArticleByFollowingUserAndTag,
} from "@/libs/actions/article/article";

type displayArticleProps = {
  userId: string;
  articleType: string | undefined;
  isTag: string | undefined;
};

const DisplayArticle: React.FC<displayArticleProps> = async ({
  articleType,
  userId,
  isTag,
}) => {
  if (articleType === undefined && isTag === undefined) {
    const articles = await getArticles();
    return (
      <div className="space-y-2 ">
        {articles.map((articleslist) => {
          return (
            <AllArticleCard
              key={articleslist.article_id}
              article={articleslist}
              user_id={userId}
            />
          );
        })}
      </div>
    );
  }

  if (articleType === "following" && isTag === undefined) {
    const FollowingArticle = await getFollowingArticle(userId);
    return (
      <div className="space-y-2">
        {FollowingArticle.data &&
          FollowingArticle.data.map((article) => (
            <AllArticleCard
              key={article.article_id}
              article={article}
              user_id={userId}
            />
          ))}
      </div>
    );
  }

  if (articleType === undefined && isTag) {
    const articles = await getArticleByTag(isTag);
    return (
      <div className="space-y-2 ">
        {articles.map((articleslist) => {
          return (
            <AllArticleCard
              key={articleslist.article_id}
              article={articleslist}
              user_id={userId}
            />
          );
        })}
      </div>
    );
  }

  if (articleType && isTag) {
    const articles = await getArticleByFollowingUserAndTag(userId, isTag);

    return (
      <div className="space-y-2 ">
        {articles.data ? (
          articles.data.map((articleslist) => {
            return (
              <AllArticleCard
                key={articleslist.article_id}
                article={articleslist}
                user_id={userId}
              />
            );
          })
        ) : (
          <p>Not found any article on this tag</p>
        )}
      </div>
    );
  }
  return <div>Following article yaayyyy</div>;
};

export default DisplayArticle;
