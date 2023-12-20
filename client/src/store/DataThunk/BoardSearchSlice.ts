import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/axios";
import { BoardSearchDataType } from "../../types/BoardTypes";

const initialState: BoardSearchDataType = {
  data: [],
  count: 0,
  search: "",
};

/**
 * Board Search State는 모두의 에러 검색 결과입니다.
 */

export const fetchBoardSearchData = createAsyncThunk(
  "board/fetchSearchData",
  async ({ search, offset }: { search: string; offset: number }) => {
    const response = await api.get(
      `/api/board/boardSearch?&search=${search}&offset=${offset}`
    );

    return response.data;
  }
);

const boardSearchSlice = createSlice({
  name: "boardSearch",
  initialState,
  reducers: {
    clearBoardSearch: () => {
      return initialState;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBoardSearchData.fulfilled, (state, action) => {
      state.data = action.payload.data;
      state.count = action.payload.count;
    });
  },
});

export const { clearBoardSearch, setSearch } = boardSearchSlice.actions;
export default boardSearchSlice.reducer;
