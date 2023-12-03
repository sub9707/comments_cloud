import { createSlice } from "@reduxjs/toolkit";

export type BoardRankTabState = {
  daily: boolean;
  weekly: boolean;
  monthly: boolean;
};
const initialState: BoardRankTabState = {
  daily: true,
  weekly: false,
  monthly: false,
};
export const BoardRankTabSlice = createSlice({
  name: "BoardRankTab",
  initialState,
  reducers: {
    setDaily: (state) => {
      state.daily = true;
      state.weekly = false;
      state.monthly = false;
    },
    setWeekly: (state) => {
      state.daily = false;
      state.weekly = true;
      state.monthly = false;
    },
    setMonthly: (state) => {
      state.daily = false;
      state.weekly = false;
      state.monthly = true;
    },
    clearRank: () => {
      return initialState;
    },
  },
});

export const { setDaily, setWeekly, setMonthly, clearRank } =
  BoardRankTabSlice.actions;

export default BoardRankTabSlice.reducer;
