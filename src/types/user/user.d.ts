import { userProps } from "./user.d";
export type userProps = {
  user_id: string;
  user_email: string;
  user_fullname: string;
  user_profile: string;
  user_provider: string;
  created_at: string;
  updated_at: string;
  user_verify: boolean;
};

export type userWriteProps = {
  user: userProps;
  writeId: string;
  tagValue: string[];
};

export type Loading = {
  isLoading: boolean;
};

export type userSocialProps = {
  user_social: {
    user_social_id: string;
    user_social_facebook: string;
    user_social_github: string;
    user_social_twitter: string;
    user_id: string;
  };
};

export type updatePromise = {
  error?: any;
};
