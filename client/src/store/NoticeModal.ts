import { createSlice } from "@reduxjs/toolkit";

export type NoticeModalState = {
  title: string;
  content: string;
};

const initialState = {
  title: "",
  content: "",
};

export const noticeModalSlice = createSlice({
  name: "noticeModal",
  initialState,
  reducers: {
    setData: (state, actions) => {
      const { title, content } = actions.payload;
      state.title = title;
      state.content = content;
    },
    clearData: (state) => {
      (state.title = ""), (state.content = "");
    },
  },
});

export const { setData, clearData } = noticeModalSlice.actions;
export default noticeModalSlice.reducer;
