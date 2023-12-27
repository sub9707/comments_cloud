import { BoardFetchType } from "./board";

export type ReplyData = {
  id: number;
  content: string;
  write_date: string;
  writer_id: number;
  likes: number;
  email: string;
  profileImg: string;
  nickname: string;
};

export type ErrorReplyType = {
  content: string;
  writer_id: number;
  content_id: number;
  profileImg: string;
};

export type CommentData = {
  id: number;
  content: string;
  comment_id: number;
  writer_id: number;
  write_date: string;
  nickname: string;
};

export type MyErrorSearchType = {
  id: number;
  title: string;
  write_date: string;
  views: number;
};
export type MyErrorSearchDataType = {
  data: MyErrorSearchType[];
  count: number;
  loading: boolean;
};

export type BoardSearchDataType = {
  data: BoardFetchType[];
  count: number;
  search: string;
};
