import createSupabaseServerClient from "@/libs/supabase/server";
import { tagProps } from "@/types/tag/tag";

export async function getArticleTags(article_id: string) {}

export async function newTag(article_id: string, tagData: tagProps) {}

export async function deleteTag(article_id: string) {}
