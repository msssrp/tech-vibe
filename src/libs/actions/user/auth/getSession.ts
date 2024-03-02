"use server";

import createSupabaseServerClient from "@/libs/supabase/server";
export default async function getUserSession() {
  const supabase = await createSupabaseServerClient();
  return supabase.auth.getUser();
}
