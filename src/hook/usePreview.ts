import { getArticleByUsernamandPostId } from "@/libs/actions/article/article";
import { getArticleTags } from "@/libs/actions/tag/tag";
import getUserSession from "@/libs/actions/user/auth/getSession";
import { getUser } from "@/libs/actions/user/user";
import {
  getUserFollower,
  getUserThatFollowing,
} from "@/libs/actions/user/user_following";
import { getUserRoleOnServer } from "@/libs/actions/user/user_role";
import { convertTime } from "@/libs/convertTime";
import { redirect } from "next/navigation";

const usePreviewPage = async (
  userName: string,
  articleTitle: string,
  articleId: string
) => {
  const { data: userSession } = await getUserSession();
  if (!userSession.user) return redirect("/SignIn");
  const userRole = await getUserRoleOnServer(userSession.user.id);
  const hasModeratorRole = userRole?.some(
    (role) => role.user_role_name === "moderator"
  );
  if (!hasModeratorRole) return redirect("/");
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

  const { count: userFollow } = await getUserThatFollowing(
    article.pgrst_scalar.user_id,
    userSession.user.id
  );

  return {
    article,
    userSession,
    user,
    day,
    month,
    Tagdata,
    UserFollowers,
    userFollow,
  };
};

export default usePreviewPage;
