export type UserData = {
  id: number;
  name: string;
  email: string;
  registerDate: string;
  last_login: string;
};
export type UserTableProps = {
  data: UserData[];
  searchTerm: string;
};

export type UserInfoType = {
  email: string;
  id: number;
  name: string;
  nickname: string;
  nickname_change_date: string;
  profileImg: string;
  profile_message: string;
  registerDate: string;
  homepage: string;
  last_login: string;
};
export type UpdateUserInfoType = {
  name: string;
  nickname: string;
  profile_message: string;
  homepage: string;
  curImageUrl: string;
  headers?: Record<string, string>;
};
export type noteCountData = {
  TotalNoteCount: number;
  TotalSolvedCount: number;
  TotalLikedCount: number;
};
export type recentErrorType = {
  title: string;
  error_solved: boolean;
  id: number;
  likes: number;
  views: number;
  write_date: string;
  tags: string;
};
