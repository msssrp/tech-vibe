import createSupabaseClient from "@/libs/supabase/client";
import createSupabaseServerClient from "@/libs/supabase/server";

export async function getCommentOnArticle(article_id: string) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("comment")
    .select("*")
    .eq("article_id", article_id);
  if (error) console.log(error);
  return { data: data };
}

export async function newComment(
  article_id: string,
  comment: string,
  user_id: string,
  commentParent_id?: string
) {
  const supabase = createSupabaseClient();
  if (!commentParent_id) {
    const { error } = await supabase.from("comment").insert({
      article_id: article_id,
      comment_content: comment,
      user_id: user_id,
    });
    if (error) return console.log(error);
  } else {
    const { error } = await supabase.from("comment").insert({
      article_id: article_id,
      comment_content: comment,
      commentParent_id: commentParent_id,
      user_id: user_id,
    });
  }
}

export async function replyComment(comment_id: string, comment: string) {}

export async function deleteComment(comment_id: string) {}

export async function updateComment(comment_id: string, newComment: string) {}
