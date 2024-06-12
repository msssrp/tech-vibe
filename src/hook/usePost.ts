import { getArticleByUsernamandPostId } from "@/libs/actions/article/article";
import {
  getArticleUps,
  getUserDowns,
  getUserUps,
} from "@/libs/actions/article/articleStat";
import { getCommentOnArticle } from "@/libs/actions/comment/comment";
import { getArticleTags } from "@/libs/actions/tag/tag";
import getUserSession from "@/libs/actions/user/auth/getSession";
import { getUser } from "@/libs/actions/user/user";
import {
  getUserFollower,
  getUserThatFollowing,
} from "@/libs/actions/user/user_following";
import { convertTime } from "@/libs/convertTime";

const usePost = async (
  userName: string,
  articleTitle: string,
  articleId: string
) => {
  const userSession = await getUserSession();

  const article = await getArticleByUsernamandPostId(
    userName,
    articleTitle,
    articleId
  );

  const user = await getUser(article.pgrst_scalar.user_id);
  const { day, month } = convertTime(
    article.pgrst_scalar.created_at ? article.pgrst_scalar.created_at : ""
  );
  const Tagdata = await getArticleTags(article.pgrst_scalar.article_id);
  const { count: UserFollowers } = await getUserFollower(
    article.pgrst_scalar.user_id
  );
  const { data: CommentData } = await getCommentOnArticle(
    article.pgrst_scalar.article_id
  );
  const { count: userFollow } = await getUserThatFollowing(
    article.pgrst_scalar.user_id,
    userSession?.data?.user?.id
  );
  const { data } = await getArticleUps(article.pgrst_scalar.article_id);
  const UpCount = await getUserUps(
    article.pgrst_scalar.article_id,
    userSession.data.user?.id
  );

  const DownCount = await getUserDowns(
    article.pgrst_scalar.article_id,
    userSession.data.user?.id
  );

  return {
    article,
    userSession,
    user,
    day,
    month,
    Tagdata,
    UserFollowers,
    CommentData,
    userFollow,
    data,
    UpCount,
    DownCount,
  };
};

export default usePost;
