import createSupabaseClient from "@/libs/supabase/client";
import createSupabaseServerClient from "@/libs/supabase/server";
import { notificationProps } from "@/types/notification/notification";

export async function getNotification(
  user_id: string
): Promise<notificationProps[]> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("notification")
    .select("*")
    .eq("user_id", user_id);
  if (error) {
    return Promise.reject(error);
  }
  return data as notificationProps[];
}

type notificationInsert = {
  notification_title: string;
  notification_type: string;
  notification_content: string;
  user_id: string;
  article_title?: string;
};

export async function createNewNotification(
  title: string,
  type: string,
  content: string,
  userId: string,
  articleTitle?: string
) {
  const supabase = createSupabaseClient();
  let insertObject: notificationInsert = {
    notification_title: title,
    notification_type: type,
    notification_content: content,
    user_id: userId,
  };

  if (articleTitle) {
    insertObject.article_title = articleTitle;
  }

  const { error } = await supabase.from("notification").insert(insertObject);
  if (error) return console.log(error);
}
