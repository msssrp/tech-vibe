import createSupabaseClient from "@/libs/supabase/client";
import createSupabaseServerClient from "@/libs/supabase/server";

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
