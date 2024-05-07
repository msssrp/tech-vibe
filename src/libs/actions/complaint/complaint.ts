import createSupabaseClient from "@/libs/supabase/client";
import createSupabaseServerClient from "@/libs/supabase/server";
import { complaintProps } from "@/types/complaint/complaint";

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

export async function getComplaints() {}

export async function getComplaintByStatus(status: string) {}

export async function deleteComplaint(complaint_id: string) {}

export async function insertModComment(
  complaint_id: string,
  modComment: string
) {}

export async function updateComplaintStatus(
  complaint_id: string,
  newStatus: string
) {}
