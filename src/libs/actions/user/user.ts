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

export async function getTotalUser() {
  const supabase = await createSupabaseServerClient();
  const { count, error } = await supabase
    .from("user")
    .select("*", { count: "exact", head: true });
  if (error) console.log(error);

  return count;
}
