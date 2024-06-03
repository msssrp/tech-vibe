import createSupabaseClient from "@/libs/supabase/client";
import createSupabaseServerClient from "@/libs/supabase/server";
import { userRoleProps } from "@/types/user/user_role";

export async function getUsersCount() {
  const supabase = createSupabaseClient();
  const { count, error } = await supabase
    .from("user_role")
    .select("*", { count: "exact", head: true })
    .eq("user_role_name", "user");
  if (error) console.log(error);
  return count;
}

export async function getModeratorCount() {
  const supabase = createSupabaseClient();
  const { count, error } = await supabase
    .from("user_role")
    .select("*", { count: "exact", head: true })
    .eq("user_role_name", "moderator");
  if (error) console.log(error);
  return count;
}

export async function getAdminCount() {
  const supabase = createSupabaseClient();
  const { count, error } = await supabase
    .from("user_role")
    .select("*", { count: "exact", head: true })
    .eq("user_role_name", "admin");
  if (error) console.log(error);
  return count;
}

export async function getUserRole(
  user_id: string
): Promise<{ user_role_name: string }[] | null> {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("user_role")
    .select("user_role_name")
    .eq("user_id", user_id);
  if (error) console.log(error);
  return data;
}

export async function getUserRoleOnServer(
  user_id: string
): Promise<{ user_role_name: string }[] | null> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("user_role")
    .select("user_role_name")
    .eq("user_id", user_id);
  if (error) console.log(error);

  return data;
}
