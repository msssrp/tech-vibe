"use server";
import createSupabaseServerClient from "@/libs/supabase/server";
import { updatePromise, userProps } from "@/types/user/user";

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
