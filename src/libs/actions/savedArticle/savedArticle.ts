import createSupabaseServerClient from "@/libs/supabase/server";

export async function saveArticle(
  article_id: string,
  user_id: string,
  readlists_id: string
) {}

export async function getSavedArticle(readlists_id: string) {}

export async function deleteSavedArticle(savedArticle_id: string) {}
