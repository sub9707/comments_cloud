import { createSlice } from "@reduxjs/toolkit";
import { MyErrorTablePropType } from "../types/TableTypes";

// const initialState = {
//   id: 0,
//   title: "",
//   tags: "",
//   error_state: "",
//   error_cause: "",
//   error_process: "",
//   error_result: "",
//   error_solved: 0,
//   likes: 0,
//   views: 0,
//   write_date: "",
//   writer_id: 0,
//   publicCheck: 0,
// };
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
