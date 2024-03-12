"use client";

import createSupabaseClient from "@/libs/supabase/client";
import { userProps } from "@/types/user/user";

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
