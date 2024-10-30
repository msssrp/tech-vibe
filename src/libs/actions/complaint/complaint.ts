import createSupabaseClient from "@/libs/supabase/client";
import createSupabaseServerClient from "@/libs/supabase/server";
import { articleProps } from "@/types/article/article";
import {
  compalintPropsWithArticleAndUser,
  complaintProps,
  complaintPropsWithArticle,
} from "@/types/complaint/complaint";

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

export async function getComplaintsArticles(): Promise<
  { data: articleProps[] | null; count: number | null } | undefined
> {
  const supabase = await createSupabaseServerClient();
  const { data, count, error } = await supabase
    .from("article")
    .select("*", { count: "exact" })
    .eq("article_status", "complaint");
  if (error) console.log(error);
  //@ts-ignore
  return { data, count };
}

export async function getComplaints(): Promise<
  compalintPropsWithArticleAndUser[] | undefined
> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.from("complaint").select(`
    *,
    user (*),
    article (*, user(*))`);
  if (error) console.log("error from get complaints", error);
  //@ts-ignore
  if (data) return data;
}

export async function getComplaintByArticleId(
  articleId: string
): Promise<complaintPropsWithArticle[] | null> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("complaint")
    .select("*, article (*, user(*))")
    .eq("article_id", articleId);
  if (error) console.log(error);
  //@ts-ignore
  return data;
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

export const complaintStatuses = [
  { id: 1, status: "pending", name: "In progress", color: "orange" },
  { id: 2, status: "complaint", name: "Complaint", color: "green" },
  { id: 3, status: "delete", name: "Deleted", color: "red" },
];
