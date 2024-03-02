import createSupabaseServerClient from "@/libs/supabase/server";

export async function getCommentOnArticle(article_id: string) {}

export async function newComment(article_id: string, comment: string) {}

export async function replyComment(comment_id: string, comment: string) {}

export async function deleteComment(comment_id: string) {}

export async function updateComment(comment_id: string, newComment: string) {}
