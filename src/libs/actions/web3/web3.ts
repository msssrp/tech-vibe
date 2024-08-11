import createSupabaseClient from "@/libs/supabase/client";
import createSupabaseServerClient from "@/libs/supabase/server";

const web3Id = "0930fd21-a370-41fe-9195-6369edda0b76";

export async function updateUpvotes(upvotes: number) {
  const supabase = createSupabaseClient();
  const { error } = await supabase
    .from("web3")
    .update({ web3_upvotes: upvotes })
    .eq("web3_id", web3Id);
  if (error) return error.message;
}

export async function updateCertificate(newCertificateUrl: string) {
  const supabase = createSupabaseClient();
  const { error } = await supabase
    .from("web3")
    .update({ web3_certificate: newCertificateUrl })
    .eq("web3_id", web3Id);
  if (error) return error.message;
}

export async function getUpvotesClient() {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("web3")
    .select("web3_upvotes")
    .eq("web3_id", web3Id)
    .single();
  if (error) return error.message;
  return data.web3_upvotes;
}

export async function getUpvotes() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("web3")
    .select("web3_upvotes")
    .eq("web3_id", web3Id)
    .single();
  if (error) return error.message;
  return data.web3_upvotes;
}

export async function getCertificateUri() {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("web3")
    .select("web3_certificate")
    .eq("web3_id", web3Id)
    .single();
  if (error) return error.message;
  return data.web3_certificate;
}
