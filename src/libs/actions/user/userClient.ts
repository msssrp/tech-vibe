import createSupabaseClient from "@/libs/supabase/client";
import createSupabaseServerClient from "@/libs/supabase/server";
import { updatePromise, userProps, userWithRoleProps } from "@/types/user/user";

export async function getAdminOrNpru() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("user_role")
    .select(`user_id,user_role_name,user (*)`)
    .or("user_role_name.eq.admin,user_role_name.eq.npru");
  if (error) console.log(error);
  return data;
}

export async function getModeratorOrNpru() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("user_role")
    .select(`user_id,user_role_name,user (*)`)
    .or("user_role_name.eq.moderator,user_role_name.eq.npru");
  if (error) console.log(error);
  return data;
}

export async function getUserOrNpru() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("user_role")
    .select(`user_id,user_role_name,user (*)`)
    .or("user_role_name.eq.user,user_role_name.eq.npru");
  if (error) console.log(error);
  return data;
}

export async function getUserWithRole(): Promise<userWithRoleProps[] | null> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.from("user").select(`*,user_role(*)`);
  if (error) console.log(error);

  return data;
}

export async function getUserCount(): Promise<number | null> {
  const supabase = createSupabaseClient();
  const { count, error } = await supabase
    .from("user")
    .select("*", { count: "exact", head: true });
  if (error) console.log(error);
  return count;
}

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
  if (error) console.log(error);

  return { error: error };
}

export const UserProviders = [
  { id: 1, status: "google", name: "google", color: "gray" },
  { id: 2, status: "facebook", name: "facebook", color: "blue" },
  { id: 3, status: "github", name: "github", color: "black" },
  { id: 4, status: "email", name: "email", color: "orange" },
];
