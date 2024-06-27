import createSupabaseClient from "@/libs/supabase/client";
import createSupabaseServerClient from "@/libs/supabase/server";
import { complaintProps } from "@/types/complaint/complaint";

export async function getTotalOfComplaint() {
  const supabase = await createSupabaseServerClient();
  const { count, error } = await supabase
    .from("complaint")
    .select("*", { count: "exact", head: true });
  if (error) return error.message;
  return count;
}

export async function newComplaint(
  user_id: string,
  article_id: string,
  reportTitle: string,
  reportDesc: string,
  reportStatus: string
) {
  const supabase = createSupabaseClient();
  const { error } = await supabase.from("complaint").insert({
    complaint_title: reportTitle,
    complaint_description: reportDesc,
    complaint_status: reportStatus,
    user_id: user_id,
    article_id: article_id,
  });
  if (error) return console.log(error);
}

export async function getComplaints(): Promise<complaintProps[] | undefined> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.from("complaint").select("*");
  if (error) console.log("error from get complaints", error);

  if (data) return data;
}

export async function getComplaintByStatus(status: string) {}

export async function deleteComplaint(complaintId: string) {
  const supabase = createSupabaseClient();
  const { error } = await supabase
    .from("complaint")
    .update({ complaint_status: "delete" })
    .eq("complaint_id", complaintId);
  if (error) return error.message;
}

export async function confirmComplaint(
  complaintId: string,
  complaintContent: string
) {
  const supabase = createSupabaseClient();
  const { error } = await supabase
    .from("complaint")
    .update({
      complaint_status: "complaint",
      complaint_mod_comment: complaintContent,
    })
    .eq("complaint_id", complaintId);
  if (error) return error.message;
}

export async function insertModComment(
  complaint_id: string,
  modComment: string
) {}

export async function updateComplaintStatus(
  complaint_id: string,
  newStatus: string
) {}
