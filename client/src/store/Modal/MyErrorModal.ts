import { createSlice } from "@reduxjs/toolkit";
import { MyErrorTablePropType } from "../../types/TableTypes";

type MyErrorModalState = {
  data: MyErrorTablePropType | null;
};

const initialState: MyErrorModalState = {
  data: null,
};

export const myErrorModalSlice = createSlice({
  name: "myError",
  initialState,
  reducers: {
    setMyErrorData: (state, action) => {
      state.data = action.payload;
    },
    clearMyErrorData: (state) => {
      state.data = null;
    },
  },
});

export const { setMyErrorData, clearMyErrorData } = myErrorModalSlice.actions;

export default myErrorModalSlice.reducer;
