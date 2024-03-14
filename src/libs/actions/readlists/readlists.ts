import createSupabaseClient from "@/libs/supabase/client";
import createSupabaseServerClient from "@/libs/supabase/server";
import { readlistsProps } from "@/types/readlists/readlists";

export async function getReadlists(
  user_id: string
): Promise<readlistsProps[] | null> {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("readlists")
    .select("*")
    .eq("user_id", user_id);
  if (error) console.log(error);
  return data;
}

export async function newReadlists(user_id: string, readlistsName: string) {
  const supabase = createSupabaseClient();
  const { error } = await supabase.from("readlists").insert({
    readlists_name: readlistsName,
    user_id: user_id,
  });
  if (error) console.log(error);
}

export async function updateReadlistName(
  readlists_id: string,
  newName: string
) {}

export async function deleteReadlists(readlists_id: string) {}
