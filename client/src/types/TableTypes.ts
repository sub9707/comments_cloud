export type NoticeTablePropType = {
  id: number;
  title: string;
  content: string;
  createDate: string;
  imgUrls: string[] | null;
};

export type NoticeTableProps = {
  data: NoticeTablePropType[];
};
export type MyErrorTablePropType = {
  id: number;
  title: string;
  error_state: string;
  error_cause: string;
  error_process: string;
  error_result: string;
  likes: number;
  views: number;
  write_date: string;
  writer_id: number;
};
export type MyErrorTableProps = {
  data: MyErrorTablePropType[];
};
