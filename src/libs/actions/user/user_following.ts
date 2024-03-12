import createSupabaseServerClient from "@/libs/supabase/server";

export async function getUserFollower(user_id: string) {
  const supabase = await createSupabaseServerClient();
  const { count } = await supabase
    .from("user_following")
    .select("*", { count: "exact" });
  return { count: count };
}
