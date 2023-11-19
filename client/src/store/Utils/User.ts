import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

export type userStateType = {
  user: {
    data: {
      name: string;
      email: string;
    };
  };
};

const initialState = {
  data: {
    name: "",
    email: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
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
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState);
  },
});

// Define selectors using createSlice
export const selectUserName = (state: userStateType) => state.user.data.name;
export const selectUserEmail = (state: userStateType) => state.user.data.email;

export default userSlice.reducer;
export const { setUser, clearUser } = userSlice.actions;
