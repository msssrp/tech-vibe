export type NoticardProps = {
  type: string;
  title: string;
  content: string;
  status: string;
  userId: string;
  articleTitle?: string;
};

export type WriteState = {
  user_id: string | undefined;
  user_fullname: string | undefined;
  user_picture: string | undefined;
  user_email: string | undefined;
  isLoading: boolean;
};
