export type BoardFetchType = {
  id: number;
  title: string;
  publicCheck: boolean;
  tags: string[];
  views: number;
  write_date: string;
  error_solved: boolean;
  error_cause: string;
};
