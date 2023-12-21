export type NoticeTablePropType = {
  id: number;
  title: string;
  content: string;
  createDate: string;
  img_url: string;
};

export type NoticeTableProps = {
  data: NoticeTablePropType[];
};
export type MyErrorTablePropType = {
  id: number;
  title: string;
  tags: string;
  error_state: string;
  error_cause: string;
  error_process: string;
  error_result: string;
  error_solved: number;
  likes: number;
  views: number;
  write_date: string;
  writer_id: number;
  publicCheck: number;
};
export type MyErrorTableProps = {
  data: MyErrorTablePropType[];
};

export type LikedBoardType = {
  id: number;
  title: string;
  nickname: string;
  like_date: string;
  writer_id: number;
};

export type LikedBoardsListType = {
  data: LikedBoardType[];
  total_count: number;
};
