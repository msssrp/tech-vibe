import createSupabaseClient from "@/libs/supabase/client";
import createSupabaseServerClient from "@/libs/supabase/server";
import { carouselProps } from "@/types/setting/setting";
import { v4 as uuidv4 } from "uuid";
const settingId = "a1d61ca8-cac4-437c-8f1a-d38d5b5007bf";

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

export async function getCarousel(): Promise<carouselProps[] | null> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("web_carousel")
    .select("*")
    .order("created_at", { ascending: true });
  if (error) console.log("error from getCarousel", error);
  return data;
}

export async function uploadNewCarousel(file: File) {
  const supabase = createSupabaseClient();
  const randomUUID = uuidv4();
  const { data, error } = await supabase.storage
    .from("Images")
    .upload(`Carousel/${randomUUID}`, file, {
      cacheControl: "3600",
      upsert: false,
    });
  if (error) console.log(error);
  if (data) return data.path;
}

export async function updateWebCarouselUrl(
  newCarouselUrl: string,
  carouselId: string
) {
  const supabase = createSupabaseClient();
  const { error } = await supabase
    .from("web_carousel")
    .update({ carousel_url: newCarouselUrl })
    .eq("id", carouselId);
  if (error) console.log(error);
}

export async function removePreviousCarousel(carouselName: string) {
  const supabase = createSupabaseClient();
  const { error } = await supabase.storage
    .from("Images")
    .remove([`${carouselName}`]);
  if (error) console.log(error);
}
