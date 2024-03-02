import createSupabaseServerClient from "@/libs/supabase/server";

export async function getReadlists(user_id: string) {}

export async function newReadlists(user_id: string, readlistsName: string) {}

export async function updateReadlistName(
  readlists_id: string,
  newName: string
) {}

export async function deleteReadlists(readlists_id: string) {}
