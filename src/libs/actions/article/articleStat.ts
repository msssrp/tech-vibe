import createSupabaseClient from "@/libs/supabase/client";
import createSupabaseServerClient from "@/libs/supabase/server";
import { articleStat } from "@/types/article/articleStat";

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
  if (data && data.articleStat_views >= 0) {
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
