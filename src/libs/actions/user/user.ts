"use server";
import createSupabaseServerClient from "@/libs/supabase/server";
import { userProps } from "@/types/user/user";

export async function getUser(userId: string): Promise<userProps> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("user")
    .select("*")
    .eq("user_id", userId)
    .limit(1)
    .single();
  return data;
}

export async function getTotalUser(
  currentUserId: string
): Promise<number | null> {
  const supabase = await createSupabaseServerClient();
  const { count, error } = await supabase
    .from("user")
    .select("*", { count: "exact", head: true })
    .not("user_id", "eq", currentUserId);
  if (error) console.log(error);

  return count;
}

export async function getUserActive(userId: string) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("user")
    .select("user_status")
    .eq("user_id", userId)
    .single();
  if (error) console.log(error);
  return data;
}
