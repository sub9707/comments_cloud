export type ReplyData = {
  id: number;
  content: string;
  write_date: string;
  writer_id: number;
  likes: number;
  email: string;
  profileImg: string;
};

export type ErrorReplyType = {
  content: string;
  writer_id: number;
  content_id: number;
};
