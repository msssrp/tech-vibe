import { articleProps } from "./article.d";
import { commentProps } from "../comment/comment";
import { tagProps } from "../tag/tag";
import { userProps } from "./../user/user.d";
export type articleProps = {
  article_id: string;
  article_title: string;
  article_description: string;
  article_cover: string;
  article_content: string;
  article_status?: string;
  created_at?: string;
  updated_at?: string;
  user_id: string;
  article_claim: boolean;
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
  user: userProps;
  writeId: string;
  isEdit?: boolean;
  articleData?: articleProps;
  articleTag?: any;
  webLogoUrl: string;
};

export type DrawerCommentProps = {
  comment: commentProps[];
  article_id: string;
  user_id: string | undefined;
  openCommend?: string;
};

export type reviewProps = {
  ReviewId: string;
  Timestamp: number;
  Reviewer: string;
  Title: string;
  Rating: number;
  IpfsHash: string[];
};
interface UploadedFile extends File {
  preview: string;
}

export type columnDefProps = {
  tokenId: number;
  ownerAddress: string;
  ipfsHash: string;
  timestamp: number;
};

type Inputs = {
  fullname: string;
  github: string;
  facebook: string;
  twitter: string;
};

export type articlePropsWithUser = {
  article_id: string;
  article_title: string;
  article_description: string;
  article_cover: string;
  article_content: string;
  article_status?: string;
  created_at: string;
  updated_at?: string;
  user_id: string;
  user: userProps;
};

export type FilterProps = {
  setColumFilters: React.Dispatch<
    React.SetStateAction<
      {
        id: string;
        value: string;
      }[]
    >
  >;
  columnFilters: {
    id: string;
    value: string;
  }[];
};

export type certificateData = {
  tokenId: string;
  ownerAddress: string;
  ipfsUrl: string;
  timestamp: number;
};

export type ipfsData = {
  author: string;
  blogName: string;
  description: string;
  image: string;
  name: string;
  title: string;
};
