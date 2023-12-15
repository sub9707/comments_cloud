import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

export const TOKEN_TIME_OUT = 600 * 1000;

export const tokenSlice = createSlice({
  name: "authToken",
  initialState: {
    authenticated: false,
    accessToken: null,
    expireTime: null as null | number,
  },
  reducers: {
    SET_TOKEN: (state, action) => {
      state.authenticated = true;
      state.accessToken = action.payload;
      state.expireTime = new Date().getTime() + TOKEN_TIME_OUT;
    },
    DELETE_TOKEN: (state) => {
      state.authenticated = false;
      state.accessToken = null;
      state.expireTime = null;
    },
  },
});

export const selectAccessToken = (state: RootState) =>
  state.authToken.accessToken;
export const selectExpireTime = (state: RootState) =>
  state.authToken.expireTime;

export const { SET_TOKEN, DELETE_TOKEN } = tokenSlice.actions;

export default tokenSlice.reducer;
