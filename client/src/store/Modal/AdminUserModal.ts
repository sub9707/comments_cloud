import { createSlice } from "@reduxjs/toolkit";
import { UserInfoType } from "@/types/users";

const initialState: UserInfoType = {
  email: "",
  id: -1,
  name: "",
  nickname: "",
  nickname_change_date: "",
  profileImg: "",
  profile_message: "",
  registerDate: "",
  homepage: "",
  last_login: "",
};

export const adminUserModalSlice = createSlice({
  name: "adminUserModal",
  initialState,
  reducers: {
    setUserModal: (state, actions) => {
      return (state = actions.payload);
    },
    clearUserModal: (state) => {
      return (state = initialState);
    },
  },
});

export const { setUserModal, clearUserModal } = adminUserModalSlice.actions;
export default adminUserModalSlice.reducer;
