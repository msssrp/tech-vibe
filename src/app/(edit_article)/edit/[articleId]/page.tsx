import { Metadata } from "next";
import { redirect } from "next/navigation";
import getUserSession from "@/libs/actions/user/auth/getSession";
import Write from "@/app/(write)/write/[...writeId]/component/Write";
import { getUser } from "@/libs/actions/user/user";
import { getArticleById } from "@/libs/actions/article/article";
import { getArticleTags } from "@/libs/actions/tag/tag";
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Write",
    description: "Write an article",
  };
}
export default async function writepage({
  params,
}: {
  params: { articleId: string };
}) {
  const userSession = await getUserSession();
  if (!userSession.data.user || !params.articleId) {
    redirect("/");
  }
  const userData = await getUser(userSession.data.user.id);
  const article = await getArticleById(params.articleId);

  if (article.user_id !== userSession.data.user.id) return redirect("/");
  const articleTag = await getArticleTags(article.article_id);

  return (
    <div>
      <Write
        user={userData}
        writeId={params.articleId}
        isEdit={true}
        articleData={article}
        articleTag={articleTag?.tag_name}
      />
    </div>
  );
}
