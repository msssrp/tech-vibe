"use server";
import createSupabaseServerClient from "@/libs/supabase/server";
import { userProps, userSocialProps } from "@/types/user/user";
import { error } from "console";

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

type updatePromise = {
  error?: any;
};

export async function updateFullname(
  fullname: string,
  userId: string | undefined
): Promise<updatePromise> {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from("user")
    .update({ user_fullname: fullname, user_verify: true })
    .eq("user_id", userId);
  return { error: error };
}

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
