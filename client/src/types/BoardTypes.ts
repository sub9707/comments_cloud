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
};

export type BoardSearchType = {
  id: number;
  title: string;
  error_cause: string;
  error_solved: boolean;
  write_date: string;
  tags: string;
};

export type BoardSearchDataType = {
  data: BoardSearchType[];
  count: number;
};
