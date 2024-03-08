import createSupabaseClient from "@/libs/supabase/client";
import createSupabaseServerClient from "@/libs/supabase/server";
import { tagProps } from "@/types/tag/tag";

export async function getArticleTags(article_id: string) {}

export async function newTag(article_id: string, tagData: tagProps) {
  const supabase = createSupabaseClient();
  const { error } = await supabase.from("tag").insert({
    tag_name: tagData.tag_name,
    tag_color: "test",
    article_id: article_id,
  });
  if (error) console.log(error);
}

export async function deleteTag(article_id: string) {}
