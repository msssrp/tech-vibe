import createSupabaseClient from "@/libs/supabase/client";
import createSupabaseServerClient from "@/libs/supabase/server";
import { tagProps } from "@/types/tag/tag";

export default async function getAllTags() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.from("tag").select("tag_name");
  if (error) console.log("error from get all tag:", error);
  const newSetOfTag = [...new Set(data?.flatMap((item) => item.tag_name))];
  const newData = newSetOfTag.map((tag) => ({ tag_name: tag }));
  return newData;
}

export async function getArticleTags(article_id: string) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("tag")
    .select("tag_name")
    .eq("article_id", article_id)
    .limit(1)
    .single();
  if (error) console.log(error);
  return data;
}

export async function getArticleTagsOnClient(article_id: string) {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("tag")
    .select("tag_name")
    .eq("article_id", article_id)
    .limit(1)
    .single();
  if (error) console.log(error);
  return data;
}

type getTag = {
  tag: tagProps | null;
};

export async function getArticleTagsFromClient(
  article_id: string
): Promise<getTag> {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("tag")
    .select("tag_name")
    .eq("article_id", article_id)
    .limit(1)
    .single();
  if (error) console.log(error);
  return { tag: data };
}

export async function newTag(article_id: string, tagData: tagProps) {
  const supabase = createSupabaseClient();
  const { error } = await supabase.from("tag").insert({
    tag_name: tagData.tag_name,
    article_id: article_id,
  });
  if (error) console.log(error);
}

export async function deleteTag(article_id: string) {}
