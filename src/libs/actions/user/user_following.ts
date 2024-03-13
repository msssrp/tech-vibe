import createSupabaseClient from "@/libs/supabase/client";
import createSupabaseServerClient from "@/libs/supabase/server";

export async function getUserFollower(user_id: string) {
  const supabase = await createSupabaseServerClient();
  const { count, error } = await supabase
    .from("user_following")
    .select("*", { count: "exact" })
    .eq("user_follow_id", user_id);
  if (error) console.log(error);

  return { count };
}

export async function getUserThatFollowing(
  user_id: string,
  OurUserId: string | undefined
) {
  const supabase = await createSupabaseServerClient();

  const { count, error } = await supabase
    .from("user_following")
    .select("*", { count: "exact" })
    .eq("user_id", OurUserId)
    .eq("user_follow_id", user_id);

  if (error) console.log(error);

  return { count };
}

export async function unFollowUser(user_id: string) {
  const supabase = createSupabaseClient();
  const { error } = await supabase
    .from("user_following")
    .delete()
    .eq("user_follow_id", user_id);
  if (error) console.log(error);
}

export async function newFollowUser(
  OurUser_id: string,
  userIdToFollow: string
) {
  const supabase = createSupabaseClient();
  const { error } = await supabase
    .from("user_following")
    .insert({ user_id: OurUser_id, user_follow_id: userIdToFollow });
  if (error) console.log(error);
}
