import createSupabaseClient from "@/libs/supabase/client";
import createSupabaseServerClient from "@/libs/supabase/server";

export async function saveArticle(
  article_id: string,
  user_id: string,
  readlists_id: string
) {
  const supabase = createSupabaseClient();
  const { error } = await supabase.from("savedArticle").insert({
    article_id: article_id,
    user_id: user_id,
    readlists_id: readlists_id,
  });
  if (error) console.log(error);
}

export async function getSavedArticle(
  readlists_id: string,
  article_id: string
) {
  const supabase = createSupabaseClient();
  const { count, error } = await supabase
    .from("savedArticle")
    .select("*", { count: "exact" })
    .eq("readlists_id", readlists_id)
    .eq("article_id", article_id);
  if (error) console.log(error);
  return { count };
}

export async function deleteSavedArticle(
  readlists_id: string,
  article_id: string
) {
  const supabase = createSupabaseClient();
  const { error } = await supabase
    .from("savedArticle")
    .delete()
    .eq("readlists_id", readlists_id)
    .eq("article_id", article_id);
  if (error) console.log(error);
}
