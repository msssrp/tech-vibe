import createSupabaseClient from "@/libs/supabase/client";
import createSupabaseServerClient from "@/libs/supabase/server";

export async function getModeratorCount() {
  const supabase = await createSupabaseServerClient();
  const { count, error } = await supabase
    .from("user_role")
    .select("*", { count: "exact", head: true })
    .eq("user_role_name", "moderator");
  if (error) console.log(error);
  return count;
}

export async function getAdminCount() {
  const supabase = await createSupabaseServerClient();
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

export async function deleteAdminRole(userId: string) {
  const supabase = createSupabaseClient();
  const { error } = await supabase
    .from("user_role")
    .delete()
    .eq("user_role_name", "admin")
    .eq("user_id", userId);
  if (error) console.log("error from delete admin role", error);
}

export async function insertAdminRole(userId: string) {
  const supabase = createSupabaseClient();
  const { error } = await supabase
    .from("user_role")
    .insert({ user_role_name: "admin", user_id: userId });
  if (error) console.log("error from insert admin", error);
}

export async function deleteModeratorRole(userId: string) {
  const supabase = createSupabaseClient();
  const { error } = await supabase
    .from("user_role")
    .delete()
    .eq("user_role_name", "moderator")
    .eq("user_id", userId);
  if (error) console.log("error from delete moderator role", error);
}

export async function insertModeratorRole(userId: string) {
  const supabase = createSupabaseClient();
  const { error } = await supabase
    .from("user_role")
    .insert({ user_role_name: "moderator", user_id: userId });
  if (error) console.log("error from insert moderator", error);
}
export async function deleteNpruRole(userId: string) {
  const supabase = createSupabaseClient();
  const { error } = await supabase
    .from("user_role")
    .delete()
    .eq("user_role_name", "npru")
    .eq("user_id", userId);
  if (error) console.log("error from delete npru role", error);
}

export async function insertNpruRole(userId: string) {
  const supabase = createSupabaseClient();
  const { error } = await supabase
    .from("user_role")
    .insert({ user_role_name: "npru", user_id: userId });
  if (error) console.log("error from insert npru", error);
}
