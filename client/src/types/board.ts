export type BoardFetchType = {
  id: number;
  title: string;
  publicCheck: boolean;
  tags: string;
  views: number;
  write_date: string;
  error_solved: boolean;
  error_cause: string;
};
export type BoardInfoFetchType = {
  id: number;
  title: string;
  publicCheck: boolean;
  views: number;
  likes: number;
  write_date: string;
  error_solved: boolean;
  writer_id: number;
};

export type BoardRankType = {
  id: number;
  title: string;
  write_date: string;
};

export type AdminBoardType = {
  id: number;
  title: string;
  createDate: string;
};
