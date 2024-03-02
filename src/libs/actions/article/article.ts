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
  if (error) console.log(error);
  return { article: data };
}

export async function newArticle(articleData: articleProps["article"]) {
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
  articleData: articleProps["article"]
) {
  const supabase = createSupabaseClient();
  const { error } = await supabase
    .from("article")
    .update({
      article_title: articleData.article_title,
      article_description: articleData.article_description,
      article_content: articleData.article_content,
      article_status: articleData.article_status,
    })
    .eq("article_id", article_id);
  if (error) console.log(error);
}

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
