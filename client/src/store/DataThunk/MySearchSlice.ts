import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";
import { MyErrorSearchDataType } from "../../types/BoardTypes";

const initialState: MyErrorSearchDataType = {
  data: [],
  count: 0,
};

/**
 * MySearch State는 나의 에러 검색 결과입니다.
 */

export const fetchSearchData = createAsyncThunk(
  "myError/fetchSearchData",
  async ({
    search,
    offset,
    userId,
  }: {
    search: string;
    offset: number;
    userId: number;
  }) => {
    const response = await axios.get(
      `/error/myError?userId=${userId}&search=${search}&offset=${offset}`
    );
    return response.data;
  }
);

const mySearchSlice = createSlice({
  name: "mySearch",
  initialState,
  reducers: {
    clearSearch: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSearchData.fulfilled, (state, action) => {
      state.data = [...state.data, ...action.payload.data];
      state.count = action.payload.total;
    });
  },
});

export const { clearSearch } = mySearchSlice.actions;
export default mySearchSlice.reducer;
