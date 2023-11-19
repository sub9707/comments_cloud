import { createSlice } from "@reduxjs/toolkit";

export type myErrorFilterState = {
  filter: string;
};
const initialState = {
  filter: "최신순",
};

export const myErrorFilterSlice = createSlice({
  name: "MyErrorFilter",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      const filter = action.payload;
      state.filter = filter;
    },
  },
});

export const { setFilter } = myErrorFilterSlice.actions;
export default myErrorFilterSlice.reducer;
