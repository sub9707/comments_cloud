import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";
import { BoardSearchDataType } from "../../types/BoardTypes";

const initialState: BoardSearchDataType = {
  data: [],
  count: 0,
};

/**
 * Board Search State는 모두의 에러 검색 결과입니다.
 */

export const fetchBoardSearchData = createAsyncThunk(
  "board/fetchSearchData",
  async ({ search, offset }: { search: string; offset: number }) => {
    const response = await axios.get(
      `/board/boardSearch?&search=${search}&offset=${offset}`
    );
    return response.data;
  }
);

const boardSearchSlice = createSlice({
  name: "boardSearch",
  initialState,
  reducers: {
    clearSearch: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBoardSearchData.fulfilled, (state, action) => {
      state.data = [...state.data, ...action.payload.data];
      state.count = action.payload.total;
    });
  },
});

export const { clearSearch } = boardSearchSlice.actions;
export default boardSearchSlice.reducer;
