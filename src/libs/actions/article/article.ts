import createSupabaseClient from "../../supabase/client";
import { v4 as uuid } from "uuid";

type uploadProps = {
  file: any;
  uuid: string;
};

export async function uploadImage(file: any): Promise<uploadProps> {
  const supabase = await createSupabaseClient();
  const uid = uuid();
  const { data, error } = await supabase.storage
    .from("images")
    .upload(uid, file);
  return { file: data, uuid: uid };
}
