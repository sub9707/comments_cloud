import { createSlice } from "@reduxjs/toolkit";

export type NoticeModalState = {
  id: number;
  title: string;
  content: string;
};

const initialState = {
  id: -1,
  title: "",
  content: "",
};

export const noticeModalSlice = createSlice({
  name: "noticeModal",
  initialState,
  reducers: {
    setData: (state, actions) => {
      const { id, title, content } = actions.payload;
      state.id = id;
      state.title = title;
      state.content = content;
    },
    clearData: (state) => {
      (state.id = -1), (state.title = ""), (state.content = "");
    },
  },
});

export const { setData, clearData } = noticeModalSlice.actions;
export default noticeModalSlice.reducer;
