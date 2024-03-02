import createSupabaseServerClient from "@/libs/supabase/server";
import { updatePromise, userSocialProps } from "@/types/user/user";

export async function getUserSocial(
  user_id: string | undefined
): Promise<userSocialProps> {
  const supabase = await createSupabaseServerClient();
  const { data: userSocial, error } = await supabase
    .from("user_social")
    .select("*")
    .limit(1)
    .eq("user_id", user_id)
    .single();
  if (error) {
    console.log(error);
  }
  return { user_social: userSocial };
}

export async function updateUserSocial(
  facebook: string,
  github: string,
  twitter: string,
  user_id: string | undefined
): Promise<updatePromise> {
  const supabase = await createSupabaseServerClient();
  const { error: updateSocialError } = await supabase
    .from("user_social")
    .update({
      user_social_facebook: facebook,
      user_social_github: github,
      user_social_twitter: twitter,
    })
    .eq("user_id", user_id);
  return { error: updateSocialError };
}

export async function insertUserSocial(
  facebook: string,
  github: string,
  twitter: string,
  user_id: string | undefined
): Promise<updatePromise> {
  const supabase = await createSupabaseServerClient();
  const { error: InsertError } = await supabase.from("user_social").insert({
    user_social_facebook: facebook,
    user_social_github: github,
    user_social_twitter: twitter,
    user_id: user_id,
  });
  return { error: InsertError };
}
