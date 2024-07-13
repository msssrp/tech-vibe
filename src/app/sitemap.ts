import { getArticles } from "@/libs/actions/article/article";
import { getUser } from "@/libs/actions/user/user";
import { MetadataRoute } from "next";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL as string;
interface ArticleSitemapEntry {
  url: string;
  lastModified: string | Date;
  changeFrequency?:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority?: number;
}
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allArticles = await getArticles();
  const articlesPromises = allArticles.map(
    async (article): Promise<ArticleSitemapEntry> => {
      const user = await getUser(article.user_id);
      const usernameWithHyphen = user.user_fullname.replace(/ /g, "-");
      const articleTitleWithHypen = article.article_title.replace(/ /g, "-");
      const articleFirstId = article.article_id.split("-")[0];
      const articleTitleWithId = articleTitleWithHypen + "-" + articleFirstId;
      return {
        url: `${BASE_URL}/${usernameWithHyphen}/${articleTitleWithId}`,
        lastModified: article.updated_at ? article.updated_at : new Date(),
        changeFrequency: "weekly",
        priority: 0.5,
      };
    }
  );
  const articles = await Promise.all(articlesPromises);
  return [
    {
      url: `${BASE_URL}`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    ...articles,
  ];
}
