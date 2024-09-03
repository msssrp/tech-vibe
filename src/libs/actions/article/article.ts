import {
  articleProps,
  articlePropsWithUser,
  uploadProps,
} from "@/types/article/article";
import { v4 as uuid } from "uuid";
import createSupabaseServerClient from "@/libs/supabase/server";
import createSupabaseClient from "@/libs/supabase/client";
import { adminClient } from "@/libs/supabase/client";

export async function getArticles(): Promise<articleProps[]> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("article")
    .select("*")
    .eq("article_status", "public")
    .order("created_at", { ascending: false });
  if (error) console.log(error);

  return data as articleProps[];
}

export async function getTotalOfArticle() {
  const supabase = await createSupabaseServerClient();
  const { count, error } = await supabase
    .from("article")
    .select("*", { count: "exact", head: true });
  if (error) return error.message;

  return count;
}

export async function getAllArticle(): Promise<articleProps[]> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.from("article").select("*");
  if (error) throw new Error(error.message);
  return data as articleProps[];
}

export async function getAllArticleByUserId(
  userId: string
): Promise<articleProps[]> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("article")
    .select("*")
    .eq("user_id", userId);
  if (error) throw new Error(error.message);
  return data as articleProps[];
}

export async function getArticleByStatusOnUserId(
  userId: string,
  status: string
): Promise<articleProps[]> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("article")
    .select("*")
    .eq("article_status", status)
    .eq("user_id", userId);
  if (error) console.log("error from getArticleByStatusOnUserId", error);

  return data as articleProps[];
}

export async function getArticleCoverByArticleId(articleId: string) {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("article")
    .select("article_cover")
    .eq("article_id", articleId)
    .single();

  if (error) console.log("error from getArticleCoverByArticleId", error);
  return data?.article_cover;
}

export async function getAllArticles(): Promise<articleProps[]> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.from("article").select("*");
  if (error) throw new Error(error.message);
  return data as articleProps[];
}

export async function getAllArticlesWithUser(): Promise<
  articlePropsWithUser[]
> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.from("article").select(`
    *,
    user (*)`);
  if (error) throw new Error(error.message);

  return data;
}

export async function getNpruArticleWithUser(): Promise<
  articlePropsWithUser[]
> {
  const supabase = await createSupabaseServerClient();
  const { data: userRoles, error: rolesError } = await supabase
    .from("user_role")
    .select("user_id")
    .filter("user_role_name", "eq", "npru");

  if (rolesError) {
    console.error("Error fetching user roles:", rolesError.message);
    return [];
  }

  const userIds = userRoles.map((role) => role.user_id);
  const { data: articles, error: articlesError } = await supabase
    .from("article")
    .select(
      `
      *,
      user (*)`
    )
    .in("user_id", userIds)
    .eq("article_status", "public");

  if (articlesError) {
    console.error("Error fetching NPRU articles:", articlesError.message);
    return [];
  }

  return articles;
}

export async function getNpruArticle(): Promise<articleProps[]> {
  const supabase = await createSupabaseServerClient();
  const { data: userRoles, error: rolesError } = await supabase
    .from("user_role")
    .select("user_id")
    .filter("user_role_name", "eq", "npru");

  if (rolesError) {
    console.error("Error fetching user roles:", rolesError.message);
    return [];
  }

  const userIds = userRoles.map((role) => role.user_id);
  const { data: articles, error: articlesError } = await supabase
    .from("article")
    .select("*")
    .in("user_id", userIds)
    .eq("article_status", "public");

  if (articlesError) {
    console.error("Error fetching NPRU articles:", articlesError.message);
    return [];
  }

  return articles as articleProps[];
}

export async function getNpruArticleOnUserPage(): Promise<articleProps[]> {
  const supabase = await createSupabaseServerClient();
  const { data: userRoles, error: rolesError } = await supabase
    .from("user_role")
    .select("user_id")
    .filter("user_role_name", "eq", "npru");

  if (rolesError) {
    console.error("Error fetching user roles:", rolesError.message);
    return [];
  }

  const userIds = userRoles.map((role) => role.user_id);
  const { data: articles, error: articlesError } = await supabase
    .from("article")
    .select("*")
    .eq("article_status", "public")
    .in("user_id", userIds)
    .limit(4);

  if (articlesError) {
    console.error("Error fetching NPRU articles:", articlesError.message);
    return [];
  }

  return articles as articleProps[];
}

export async function getNpruArticleOnClient(): Promise<articleProps[]> {
  const supabase = createSupabaseClient();
  const { data: userRoles, error: rolesError } = await supabase
    .from("user_role")
    .select("user_id")
    .filter("user_role_name", "eq", "npru");

  if (rolesError) {
    console.error("Error fetching user roles:", rolesError.message);
    return [];
  }

  const userIds = userRoles.map((role) => role.user_id);
  const { data: articles, error: articlesError } = await supabase
    .from("article")
    .select("*")
    .in("user_id", userIds);

  if (articlesError) {
    console.error("Error fetching NPRU articles:", articlesError.message);
    return [];
  }

  return articles as articleProps[];
}

export async function getArticleById(
  article_id: string
): Promise<articleProps> {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("article")
    .select("*")
    .eq("article_id", article_id)
    .limit(1)
    .single();
  if (error) console.log("error from getarticleById", error);

  return data;
}

export async function getArticleByIdOnServer(
  article_id: string
): Promise<articleProps> {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("article")
    .select("*")
    .eq("article_id", article_id)
    .limit(1)
    .single();
  if (error) console.log("error from getarticleById", error);

  return data;
}

export async function getArticleByIdWithPublicStatus(
  article_id: string
): Promise<articleProps> {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("article")
    .select("*")
    .eq("article_id", article_id)
    .eq("article_status", "public")
    .limit(1)
    .single();

  return data;
}

export async function getArticleByUserId(userId: string) {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("article")
    .select("*")
    .eq("user_id", userId)
    .eq("article_status", "public");
  if (error) console.log(error);
  return data as articleProps[];
}

export async function getArticleByUserIdOnServer(userId: string) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("article")
    .select("*")
    .eq("user_id", userId)
    .eq("article_status", "public");
  if (error) console.log(error);
  return data as articleProps[];
}

export async function getArticleByName(
  article_Title: string
): Promise<articleProps> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("article")
    .select("*")
    .eq("article_title", article_Title)
    .limit(1)
    .single();
  return data;
}

export async function getArticleByUsernamandPostId(
  userName: string,
  article_Title: string,
  article_id: string
): Promise<any> {
  const supabase = await createSupabaseServerClient();
  const articleIdWithWildCard = article_id + "%";
  const usernameReplace = userName.replace(/-/g, " ");
  const articleTitleReplace = article_Title.replace(/-/g, " ");
  const decodedArticleTitle = decodeURIComponent(articleTitleReplace);
  const { data, error } = await supabase
    .rpc("fetch_articles_by_partial_uuid", {
      partial_uuid: articleIdWithWildCard,
      username: usernameReplace,
      articletitle: decodedArticleTitle,
    })
    .single();
  if (error) console.log("error from getArticleByUsernamePostId", error);

  return data;
}

export async function getAuthorIdByArticleId(
  article_id: string
): Promise<string> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("article")
    .select("user_id")
    .eq("article_id", article_id)
    .limit(1)
    .single();
  return data?.user_id;
}

export async function newArticle(articleData: articleProps) {
  const supabase = createSupabaseClient();
  const article_id = articleData.article_id;
  const { error } = await supabase.from("article").insert({
    article_id: article_id,
    article_title: articleData.article_title,
    article_description: articleData.article_description,
    article_cover: articleData.article_cover,
    article_content: articleData.article_content,
    article_status: articleData.article_status,
    user_id: articleData.user_id,
  });
  if (error) console.log(error);
}

export async function updateArticleById(
  article_id: string,
  articleData: articleProps,
  status?: string
) {
  const supabase = createSupabaseClient();
  const currentTime = new Date();
  const timeStamp = currentTime.toISOString();
  const { error } = await supabase
    .from("article")
    .update({
      article_title: articleData.article_title,
      article_description: articleData.article_description,
      article_content: articleData.article_content,
      article_status: status ? status : articleData.article_status,
      article_cover: articleData.article_cover,
      updated_at: timeStamp,
    })
    .eq("article_id", article_id);
  if (error) console.log(error);
}

export async function deleteArticle(articleId: string) {
  const supabase = createSupabaseClient();
  const { error } = await supabase
    .from("article")
    .update({ article_status: "delete" })
    .eq("article_id", articleId);
  if (error) console.log(error);
}

export async function uploadImage(
  write_id: string,
  file: any
): Promise<uploadProps> {
  const supabase = createSupabaseClient();
  const uid = uuid();
  const { data, error } = await supabase.storage
    .from("Images")
    .upload(write_id + "/" + uid, file);
  return { imagePath: data?.path };
}

export async function manageArticleStatus(articleId: string, status: string) {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("article")
    .update({ article_status: status })
    .eq("article_id", articleId);
  console.log(data, error);
  if (error) {
    console.log(error);
    return error;
  }
}

export async function getFollowingArticle(userId: string) {
  const supabase = await createSupabaseServerClient();
  const { data: dataFollowing, error: errorFollowing } = await supabase
    .from("user_following")
    .select("user_follow_id")
    .eq("user_id", userId);
  if (errorFollowing) console.log("error from get following", errorFollowing);

  if (!dataFollowing) return { error: "You didnt follow any people yet" };
  const flatternedUserIds = dataFollowing
    .flat()
    .map((item) => item.user_follow_id);
  const promises = flatternedUserIds.map(async (id) => {
    const articles = await getArticleByUserId(id);
    return articles;
  });
  const articles = await Promise.all(promises);
  const flatternedArticles = articles.flat();

  return { data: flatternedArticles };
}

export async function getArticleByTag(tag: string) {
  const supabase = await createSupabaseServerClient();
  const tagToArray = tag.split("-");
  const promise = tagToArray.flatMap(async (tag) => {
    const tagArray = [tag];
    const { data: dataTag, error } = await supabase
      .from("tag")
      .select("article_id")
      .contains("tag_name", tagArray);
    if (error) console.log("error from tag", error);
    return dataTag;
  });
  const articleIdFromTag = await Promise.all(promise);
  const flatternedArticleIds = articleIdFromTag
    .flat()
    .map((item) => item?.article_id);
  const uniqeArticleIds = new Set(flatternedArticleIds);
  const articlePromises = Array.from(uniqeArticleIds).map(async (id) => {
    const article = await getArticleByIdWithPublicStatus(id);
    return article;
  });
  let articles = await Promise.all(articlePromises);
  articles = articles.filter((article) => article !== null);

  console.log(articles);
  return articles;
}

export async function getArticleByFollowingUserAndTag(
  userId: string,
  tag: string
) {
  const supabase = await createSupabaseServerClient();
  const { data: dataFollowing, error: errorFollowing } = await supabase
    .from("user_following")
    .select("user_follow_id")
    .eq("user_id", userId);
  if (errorFollowing) console.log("error from get following", errorFollowing);

  if (!dataFollowing) return { error: "You didnt follow any people yet" };
  const flatternedUserIds = dataFollowing
    .flat()
    .map((item) => item.user_follow_id);

  const articleIdFromUserIdPromises = flatternedUserIds.map(async (id) => {
    const { data: articleIdFromUserId, error: errorArticleId } = await supabase
      .from("article")
      .select("article_id")
      .eq("user_id", id)
      .eq("article_status", "public");
    if (errorArticleId)
      console.log("error from loop article id", errorArticleId);
    return articleIdFromUserId;
  });

  const articleId = await Promise.all(articleIdFromUserIdPromises);
  const flatternedArticleIdFromPromise = articleId
    .flat()
    .map((id) => id?.article_id);

  const articleFromTagPromises = flatternedArticleIdFromPromise.map(
    async (id) => {
      const { data: articleId, error: errorArticleId } = await supabase
        .from("tag")
        .select("article_id")
        .eq("article_id", id);
      if (errorArticleId) console.log("error from loop tag", errorArticleId);
      return articleId;
    }
  );

  const articleIdFromTag = await Promise.all(articleFromTagPromises);

  const flatternedArticleIdFromTag = articleIdFromTag
    .flat()
    .map((id) => id?.article_id);

  const tagArray = tag.split("-");

  const tagPromises = flatternedArticleIdFromTag.map(async (id) => {
    const tagDataArray = await Promise.all(
      tagArray.map(async (tag) => {
        const tagArrayData = [tag];
        const { data: tagData, error: tagError } = await supabase
          .from("tag")
          .select("article_id")
          .eq("article_id", id)
          .containedBy("tag_name", tagArrayData);
        if (tagError) console.log("error from tagPromise ", tagError);
        if (tagData && tagData.length > 0) {
          return tagData.map((item) => item.article_id);
        }
        return [];
      })
    );
    return tagDataArray.flat();
  });

  const promiseTag = (await Promise.all(tagPromises)).filter(
    (item) => item.length > 0
  );
  const flatternedArticleTag = promiseTag.flat();
  const getArticleByTagPromise = flatternedArticleTag.map(async (id) => {
    const article = await getArticleById(id);
    return article;
  });

  const articles = await Promise.all(getArticleByTagPromise);
  return { data: articles };
}

export async function getRandomArticles(): Promise<articleProps[] | null> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("random_articles")
    .select("*")
    .eq("article_status", "public");
  if (error) console.log("error from get popularArticle ", error);
  return data;
}

export async function getPopularArticles(
  limit?: number
): Promise<articleProps[] | undefined> {
  const supabase = await createSupabaseServerClient();
  const { data: articleIds, error } = await supabase
    .from("article_statistics")
    .select("article_id")
    .order("articleStat_views", { ascending: false });
  if (error) console.log(error);
  const viewCounts =
    articleIds &&
    articleIds.reduce<Record<string, number>>((acc, log) => {
      acc[log.article_id] = (acc[log.article_id] || 0) + 1;
      return acc;
    }, {});
  const articlesIds = viewCounts && Object.entries(viewCounts);
  articlesIds?.sort((a, b) => b[1] - a[1]);
  const sortedArticlesIds = articlesIds?.map((article) => article[0]);

  const popularArticlesPromises =
    sortedArticlesIds &&
    sortedArticlesIds.map(async (articleId) => {
      const articles = await getArticleByIdWithPublicStatus(articleId);
      return articles;
    });

  const articles =
    popularArticlesPromises && (await Promise.all(popularArticlesPromises));

  const popularArticles =
    articles && articles.filter((article) => article !== null);
  if (limit) {
    const limitArticles = popularArticles && popularArticles.slice(0, limit);
    return limitArticles;
  }
  return popularArticles;
}

export const ArticleStatuses = [
  { id: 1, status: "pending", name: "In progress", color: "yellow" },
  { id: 2, status: "public", name: "Approved", color: "green" },
  { id: 3, status: "reject", name: "Disapproved", color: "red" },
  { id: 4, status: "complaint", name: "Complainted", color: "orange" },
  { id: 5, status: "delete", name: "Deleted", color: "red" },
];
