import { createSlice } from "@reduxjs/toolkit";

export type userStateType = {
  user: {
    data: {
      name: string;
      email: string;
    };
  };
};

export const userSlice = createSlice({
  name: "user",
  initialState: {
    data: {
      name: "",
      email: "",
    },
  },
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload;
    },
    clearUser: (state) => {
      state.data = {
        name: "",
        email: "",
      };
    },
  },
});

// Define selectors using createSlice
export const selectUserName = (state: userStateType) => state.user.data.name;
export const selectUserEmail = (state: userStateType) => state.user.data.email;

export default userSlice.reducer;
export const { setUser, clearUser } = userSlice.actions;
