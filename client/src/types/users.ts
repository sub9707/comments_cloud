export type UserData = {
  id: number;
  name: string;
  email: string;
  registerDate: string;
};
export type UserTableProps = {
  data: UserData[];
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
};
export type UpdateUserInfoType = {
  name: string;
  nickname: string;
  profile_message: string;
  homepage: string;
  curImageUrl: string;
  headers?: Record<string, string>;
};
