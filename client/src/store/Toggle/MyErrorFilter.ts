import { createSlice } from "@reduxjs/toolkit";

export type myErrorFilterState = {
  filter: string;
  isPublic: boolean;
  isSolved: boolean;
};
const initialState: myErrorFilterState = {
  filter: "최신순",
  isPublic: false,
  isSolved: false,
};

export const myErrorFilterSlice = createSlice({
  name: "MyErrorFilter",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      const filter = action.payload;
      state.filter = filter;
    },
    setPublic: (state, action) => {
      const isPublic = action.payload;
      state.isPublic = isPublic;
    },
    setSolved: (state, action) => {
      const isSolved = action.payload;
      state.isSolved = isSolved;
    },
    clearFilter: () => {
      return initialState;
    },
  },
});

export const { setFilter, setPublic, setSolved, clearFilter } =
  myErrorFilterSlice.actions;
export default myErrorFilterSlice.reducer;
