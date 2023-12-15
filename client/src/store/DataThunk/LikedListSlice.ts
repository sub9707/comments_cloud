import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/axios";
import { LikedBoardsListType } from "../../types/TableTypes";

const initialState: LikedBoardsListType = {
  data: [],
  total_count: 0,
};

/**
 * LikedList State는 좋아요 누른 게시글 데이터입니다.
 */
export const fetchLikedList = createAsyncThunk(
  "board/likedBoardsList",
  async ({ userId, offset }: { userId: number; offset: number }) => {
    const response = await api.get(
      `/user/likedNoteList?userId=${userId}&offset=${offset}`
    );
    return response.data;
  }
);
const LikedBoardListSlice = createSlice({
  name: "replies",
  initialState,
  reducers: {
    clearLikedList: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLikedList.fulfilled, (state, action) => {
      if (action.payload) {
        const { data, totalCount } = action.payload;
        state.data = [...state.data, ...data];
        state.total_count = totalCount;
      }
    });
  },
});

export const { clearLikedList } = LikedBoardListSlice.actions;

export default LikedBoardListSlice.reducer;
