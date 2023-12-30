import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

interface PasswordCheck {
  Authenticated: boolean;
}

const initialState: PasswordCheck = {
  Authenticated: false,
};

export const PasswordCheckedSlice = createSlice({
  name: "PasswordCheck",
  initialState,
  reducers: {
    setPasswordChecked: (state, action) => {
      state.Authenticated = action.payload;
    },
  },
});

export const isPasswordAuthenticated = (state: RootState) =>
  state.PasswordCheckedSlice.Authenticated;

export const { setPasswordChecked } = PasswordCheckedSlice.actions;
export default PasswordCheckedSlice.reducer;
