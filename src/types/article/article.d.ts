import { commentProps } from "../comment/comment";
import { userProps } from "./../user/user.d";
export type articleProps = {
  article: {
    article_id: string;
    article_title: string;
    article_description: string;
    article_cover: string;
    article_content: string;
    article_status?: string;
    created_at?: string;
    updated_at?: string;
    user_id?: string;
  };
};

export type tinyProps = {
  writeId: stirng;
  title: string;
  description: string;
  user_id: string | undefined;
};
export type uploadProps = {
  imagePath: string | undefined;
};
export type WriteProps = {
  user: {
    user_id?: string;
    user_email?: string;
    user_fullname?: string;
    user_profile?: string;
    user_provider?: string;
    created_at?: string;
    updated_at?: string;
    user_verify?: boolean;
  };
  writeId: string;
};

export type DrawerCommentProps = {
  comment: commentProps[];
  article_id: string;
  user_id: string;
};
