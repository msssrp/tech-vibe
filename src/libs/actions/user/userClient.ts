"use client";

import createSupabaseClient from "@/libs/supabase/client";
import { updatePromise, userProps } from "@/types/user/user";

export async function getUserFromClient(userId: string): Promise<userProps> {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("user")
    .select("*")
    .eq("user_id", userId)
    .limit(1)
    .single();
  return data;
}

export async function updateFullname(
  fullname: string,
  userId: string | undefined
): Promise<updatePromise> {
  const supabase = createSupabaseClient();
  const { error } = await supabase
    .from("user")
    .update({ user_fullname: fullname, user_verify: true })
    .eq("user_id", userId);
  return { error: error };
}
