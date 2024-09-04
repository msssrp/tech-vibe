import { articlePropsWithUser } from "../article/article";
import { userProps } from "../user/user";

export type complaintProps = {
  complaint_id: string;
  complaint_title: string;
  complaint_description: string;
  complaint_status: string;
  complaint_mod_comment?: string;
  created_at: string;
  updated_at?: string;
  user_id: string;
  article_id: string;
};

export type complaintPropsWithArticle = {
  complaint_id: string;
  complaint_title: string;
  complaint_description: string;
  complaint_status: string;
  complaint_mod_comment?: string;
  created_at: string;
  updated_at?: string;
  user_id: string;
  article_id: string;
  article: articlePropsWithUser;
};

export type compalintPropsWithArticleAndUser = {
  complaint_id: string;
  complaint_title: string;
  complaint_description: string;
  complaint_status: string;
  complaint_mod_comment?: string;
  created_at: string;
  updated_at?: string;
  user_id: string;
  article_id: string;
  user: userProps;
  article: articlePropsWithUser;
};
