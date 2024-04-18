import createSupabaseClient from "@/libs/supabase/client";
import createSupabaseServerClient from "@/libs/supabase/server";
import { createNewNotification } from "../notification/notification";

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
    const { data: user } = await supabase
      .from("user")
      .select("user_fullname")
      .eq("user_id", user_id)
      .single();
    const { data: article } = await supabase
      .from("article")
      .select("article_title,user_id")
      .eq("article_id", article_id)
      .single();
    if (user && article && user_id !== article.user_id) {
      await createNewNotification(
        `${user?.user_fullname} has comment on you're ${article.article_title}`,
        "comment",
        `${comment}`,
        article.user_id,
        article.article_title
      );
    }
  } else {
    const { error } = await supabase.from("comment").insert({
      article_id: article_id,
      comment_content: comment,
      commentParent_id: commentParent_id,
      user_id: user_id,
    });
    if (error) return console.log(error);
    const { data: user } = await supabase
      .from("user")
      .select("user_fullname")
      .eq("user_id", user_id)
      .single();
    const { data } = await supabase
      .from("comment")
      .select("user_id")
      .eq("comment_id", commentParent_id)
      .single();
    const { data: article } = await supabase
      .from("article")
      .select("article_title,user_id")
      .eq("article_id", article_id)
      .single();
    if (user && data && user_id !== data.user_id) {
      await createNewNotification(
        `${user?.user_fullname} has replied to your comment`,
        "comment",
        `${comment}`,
        data.user_id,
        article?.article_title
      );
    }
  }
}

export async function replyComment(comment_id: string, comment: string) {}

export async function deleteComment(comment_id: string) {}

export async function updateComment(comment_id: string, newComment: string) {}
