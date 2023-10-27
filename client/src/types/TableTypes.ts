export type NoticeTablePropType = {
  title: string;
  content: string;
  createDate: string;
  imgUrls: string[] | null;
};

export type NoticeTableProps = {
  data: NoticeTablePropType[];
};
