import createSupabaseClient from "@/libs/supabase/client";
import createSupabaseServerClient from "@/libs/supabase/server";

export async function getArticleViews(article_id: string) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("article_statistics")
    .select("article_views")
    .eq("article_id", article_id)
    .single();
  if (error) console.log(error);
  if (data) return { data };
}

export async function increaseArticleViews(
  article_id: string,
  currentUser_id: string
) {
  const supabase = await createSupabaseServerClient();
  const { data, error: Aerror } = await supabase
    .from("article_statistics")
    .select("articleStat_views")
    .eq("article_id", article_id)
    .eq("user_id", currentUser_id)
    .single();
  if (Aerror) console.log(Aerror);
  //@ts-ignore
  if (data && data.articleStat_views >= 0) {
    //@ts-ignore
    const newViewsCount = data.articleStat_views + 1;

    const { error } = await supabase
      .from("article_statistics")
      .update({ articleStat_views: newViewsCount })
      .eq("article_id", article_id)
      .eq("user_id", currentUser_id);
    if (error) console.log(error);

    return;
  } else {
    const { error } = await supabase.from("article_statistics").insert({
      articleStat_views: 1,
      article_id: article_id,
      user_id: currentUser_id,
    });
    if (error) console.log(error);
  }
}

export async function getArticleUps(article_id: string) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.rpc("getups", {
    article_id_from_rpc: article_id,
  });
  if (error) console.log(error);

  return { data };
}

export async function getArticleDowns(article_id: string) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("article_statistics")
    .select("articleStat_downs")
    .eq(article_id, article_id)
    .single();
  if (error) console.log(error);
  return data;
}

export async function UpsArticle(
  article_id: string,
  user_id: string,
  isCancel: boolean
) {
  const supabase = createSupabaseClient();
  if (!isCancel) {
    const { error } = await supabase
      .from("article_statistics")
      .update({ articleStat_ups: 1 })
      .eq("article_id", article_id)
      .eq("user_id", user_id);
    if (error) console.log(error);
    return;
  }
  const { error } = await supabase
    .from("article_statistics")
    .update({ articleStat_ups: 0 })
    .eq("article_id", article_id)
    .eq("user_id", user_id);
  if (error) return console.log(error);
}

export async function DownsArticle(
  article_id: string,
  user_id: string,
  isCancel: boolean
) {
  const supabase = createSupabaseClient();
  if (!isCancel) {
    const { error } = await supabase
      .from("article_statistics")
      .update({ articleStat_downs: 1 })
      .eq("article_id", article_id)
      .eq("user_id", user_id);
    if (error) console.log(error);
    return;
  }
  const { error } = await supabase
    .from("article_statistics")
    .update({ articleStat_downs: 0 })
    .eq("article_id", article_id)
    .eq("user_id", user_id);
  if (error) return console.log(error);
}

export async function getUserUps(
  article_id: string,
  user_id: string | undefined
) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("article_statistics")
    .select("articleStat_ups")
    .eq("article_id", article_id)
    .eq("user_id", user_id)
    .single();
  if (error) console.log(error);
  return data;
}

export async function getUserDowns(
  article_id: string,
  user_id: string | undefined
) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("article_statistics")
    .select("articleStat_downs")
    .eq("article_id", article_id)
    .eq("user_id", user_id)
    .single();
  if (error) console.log(error);
  return data;
}

export async function getAllArticlesViews(userId: string) {
  const supabase = createSupabaseClient();
  const { data: articleIds, error } = await supabase
    .from("article")
    .select("article_id")
    .eq("user_id", userId);
  if (error) console.log("error from get article ids", error);
  if (!articleIds) return null;
  const articleViewsPromise = articleIds.map(async (article) => {
    const { data: articleViews, error } = await supabase
      .from("article_statistics")
      .select("articleStat_views")
      //@ts-ignore
      .eq("article_id", article.article_id);
    if (error) {
      console.log("error from articleViewsPromise", error);
      return null;
    }
    return articleViews;
  });
  const articleViews = await Promise.all(articleViewsPromise);
  const totalViews = articleViews.reduce((sum, articleViewArray) => {
    if (articleViewArray) {
      return (
        sum +
        articleViewArray.reduce(
          //@ts-ignore
          (innerSum, articleView) => innerSum + articleView.articleStat_views,
          0
        )
      );
    }
    return sum;
  }, 0);

  return totalViews;
}

export async function getAllArticleUps(userId: string) {
  const supabase = createSupabaseClient();
  const { data: articleIds, error } = await supabase
    .from("article")
    .select("article_id")
    .eq("user_id", userId);
  if (error) console.log("error from get article ids", error);
  if (!articleIds) return null;
  const articleUpsPromise = articleIds.map(async (article) => {
    const { data: articleUps, error } = await supabase
      .from("article_statistics")
      .select("articleStat_ups")
      //@ts-ignore
      .eq("article_id", article.article_id);
    if (error) {
      console.log("error from articleUpsPromise", error);
      return null;
    }
    return articleUps;
  });
  const articleUps = await Promise.all(articleUpsPromise);
  const totalViews = articleUps.reduce((sum, articleUpsArray) => {
    if (articleUpsArray) {
      return (
        sum +
        articleUpsArray.reduce(
          //@ts-ignore
          (innerSum, articleView) => innerSum + articleView.articleStat_ups,
          0
        )
      );
    }
    return sum;
  }, 0);

  return totalViews;
}

export async function getArticlesViewsWithDate(userId: string) {
  const supabase = createSupabaseClient();
  const { data: articleIds, error } = await supabase
    .from("article")
    .select("article_id")
    .eq("user_id", userId);
  if (error) console.log("error from get article ids", error);
  if (!articleIds) return null;
  const articleViewsPromise = articleIds.map(async (article) => {
    const { data: articleViews, error } = await supabase
      .from("article_statistics")
      .select("articleStat_views,articleStat_ups,articleStat_createdAt")
      //@ts-ignore
      .eq("article_id", article.article_id);
    if (error) {
      console.log("error from articleViewsPromise", error);
      return null;
    }
    return articleViews;
  });
  const articleViewsWithDate = await Promise.all(articleViewsPromise);
  const flattenedViews = articleViewsWithDate.flat().map((view) => {
    //@ts-ignore
    const date = new Date(view?.articleStat_createdAt);
    const formattedDate = date.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
    });
    return {
      //@ts-ignore
      views: view?.articleStat_views,
      //@ts-ignore
      ups: view?.articleStat_ups,
      date: formattedDate,
    };
  });

  return flattenedViews;
}
