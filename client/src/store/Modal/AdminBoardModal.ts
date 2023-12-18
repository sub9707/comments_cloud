import { createSlice } from "@reduxjs/toolkit";
import { BoardInfoFetchType } from "../../types/board";
import { RootState } from "..";

const initialState: BoardInfoFetchType = {
  id: 0,
  title: "",
  publicCheck: false,
  views: 0,
  likes: 0,
  write_date: "",
  error_solved: false,
  writer_id: 0,
};
export const adminBoardModalSlice = createSlice({
  name: "adminBoardModal",
  initialState,
  reducers: {
    setBoardModal: (state, actions) => {
      return (state = actions.payload);
    },
    clearBoardModal: (state) => {
      return (state = initialState);
    },
  },
});

export const { setBoardModal, clearBoardModal } = adminBoardModalSlice.actions;
export const selectBoardData = (state: RootState) => state.adminBoardModalSlice;
export default adminBoardModalSlice.reducer;
