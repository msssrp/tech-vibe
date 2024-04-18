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

export async function createNewNotification(
  title: string,
  type: string,
  content: string,
  userId: string
) {
  const supabase = createSupabaseClient();
  const { error } = await supabase.from("notification").insert({
    notification_title: title,
    notification_type: type,
    notification_content: content,
    user_id: userId,
  });
  if (error) {
    return console.log(error);
  }
}
