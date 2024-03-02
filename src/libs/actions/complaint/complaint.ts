import createSupabaseServerClient from "@/libs/supabase/server";
import { complaintProps } from "@/types/complaint/complaint";

export async function newComplaint(
  user_id: string,
  article_id: string,
  complaintData: complaintProps
) {}

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
