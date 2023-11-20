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
  profileImg: string;
  profile_message: string;
  registerDate: string;
};
