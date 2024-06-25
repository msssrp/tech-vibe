import createSupabaseClient from "@/libs/supabase/client";
import createSupabaseServerClient from "@/libs/supabase/server";
import { v4 as uuidv4 } from "uuid";
const settingId = "30261813-1ecf-4050-9f14-eaf332e4a23f";

export async function getWebLogoUrl() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("web_logo")
    .select("logo_url")
    .eq("id", settingId)
    .single();
  if (error) console.log("error from getWebLogoUrl", error);
  if (data) return data.logo_url;
}

export async function updateWebLogoUrl(newLogoUrl: string) {
  const supabase = createSupabaseClient();
  const { error } = await supabase
    .from("web_logo")
    .update({ logo_url: newLogoUrl })
    .eq("id", settingId);
  if (error) console.log(error);
}

export async function removePreviousLogo(logoName: string) {
  const supabase = createSupabaseClient();
  const { error } = await supabase.storage
    .from("Images")
    .remove([`${logoName}`]);
  if (error) console.log(error);
}

export async function uploadNewLogo(file: File) {
  const supabase = createSupabaseClient();
  const randomUUID = uuidv4();
  const { data, error } = await supabase.storage
    .from("Images")
    .upload(`Logo/${randomUUID}`, file, {
      cacheControl: "3600",
      upsert: false,
    });
  if (error) console.log(error);
  if (data) return data.path;
}
