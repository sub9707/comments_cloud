export type LoginFormValues = {
  email: string;
  password: string;
};
export type RegisterFormValues = {
  email: string;
  name: string;
  password: string;
  passwordConfirm: string;
};
export type ErrorWriteFormValues = {
  title: string;
  tagss: string[];
  error_state: string;
  error_cause: string;
  error_process: string;
  error_solved: number;
  error_result: string;
  write_date: string;
  writer_id: number;
  publicCheck: number;
};

export type NoticeWriteValues = {
  title: string;
  content: string;
};

export type UpdateFormValue = {
  name: string;
  nickname: string;
  homepage: string;
  profile_message: string;
  profile_Image: File;
};
