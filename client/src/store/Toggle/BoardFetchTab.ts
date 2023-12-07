import { createSlice } from "@reduxjs/toolkit";

export type BoardFetchTabState = {
  recent: boolean;
  popular: boolean;
  view: boolean;
};
const initialState: BoardFetchTabState = {
  recent: true,
  popular: false,
  view: false,
};
export const BoardFetchTabSlice = createSlice({
  name: "BoardRankTab",
  initialState,
  reducers: {
    setRecent: (state) => {
      state.recent = true;
      state.popular = false;
      state.view = false;
    },
    setPopular: (state) => {
      state.recent = false;
      state.popular = true;
      state.view = false;
    },
    setView: (state) => {
      state.recent = false;
      state.popular = false;
      state.view = true;
    },
    clearFetchTab: () => {
      return initialState;
    },
  },
});

export const { setRecent, setPopular, setView, clearFetchTab } =
  BoardFetchTabSlice.actions;

export default BoardFetchTabSlice.reducer;
