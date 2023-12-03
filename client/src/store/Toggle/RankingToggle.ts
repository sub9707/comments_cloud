import { createSlice } from "@reduxjs/toolkit";

export type RankingToggleState = {
  show: boolean;
};
const initialState: RankingToggleState = {
  show: true,
};
export const RankToggleSlice = createSlice({
  name: "RankToggle",
  initialState,
  reducers: {
    setRankToggle: (state) => {
      state.show = !state.show;
    },
    initRankToggle: () => {
      return initialState;
    },
  },
});
export const { setRankToggle, initRankToggle } = RankToggleSlice.actions;

export default RankToggleSlice.reducer;
