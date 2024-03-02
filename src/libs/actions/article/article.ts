import { articleProps, uploadProps } from "@/types/article/article";
import { v4 as uuid } from "uuid";
import createSupabaseServerClient from "@/libs/supabase/server";
import createSupabaseClient from "@/libs/supabase/client";

export async function getArticles(): Promise<articleProps[]> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.from("article").select("*");
  if (error) throw new Error(error.message);
  return data as articleProps[];
}

export async function getArticleById(article_id: string) {}

export async function newArticle(articleData: articleProps) {}

export async function updateArticle(article_id: string) {}

export async function deleteArticle(article_id: string) {}

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
