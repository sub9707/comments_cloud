import { createSlice } from "@reduxjs/toolkit";

export type myErrorFilterState = {
  filter: string;
  publicOnly: boolean;
  privateOnly: boolean;
  solvedOnly: boolean;
  unsolvendOnly: boolean;
};
const initialState: myErrorFilterState = {
  filter: "최신순",
  publicOnly: false,
  solvedOnly: false,
  privateOnly: false,
  unsolvendOnly: false,
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
      const publicOnly = action.payload;
      state.privateOnly = false;
      state.publicOnly = publicOnly;
    },
    setSolved: (state, action) => {
      const solvedOnly = action.payload;
      state.unsolvendOnly = false;
      state.solvedOnly = solvedOnly;
    },
    setPrivate: (state, action) => {
      const privateOnly = action.payload;
      state.publicOnly = false;
      state.privateOnly = privateOnly;
    },
    setUnsolved: (state, action) => {
      const unsolvendOnly = action.payload;
      state.solvedOnly = false;
      state.unsolvendOnly = unsolvendOnly;
    },
    clearFilter: () => {
      return initialState;
    },
  },
});

export const {
  setFilter,
  setPublic,
  setSolved,
  setPrivate,
  setUnsolved,
  clearFilter,
} = myErrorFilterSlice.actions;
export default myErrorFilterSlice.reducer;
