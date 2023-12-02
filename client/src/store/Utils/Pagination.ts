import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Pagination {
  totalCount: number;
  currentPage: number;
  offset: number;
}

const initialState: Pagination = {
  totalCount: 0,
  currentPage: 1,
  offset: 0,
};

export const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setTotalCount: (state, action: PayloadAction<number>) => {
      state.totalCount = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setOffset: (state, action: PayloadAction<number>) => {
      state.offset = action.payload;
    },
    clearPagination: (state) => {
      state.totalCount = initialState.totalCount;
      state.currentPage = initialState.currentPage;
      state.offset = initialState.offset;
    },
  },
});

export const { setTotalCount, setCurrentPage, setOffset, clearPagination } =
  paginationSlice.actions;
export default paginationSlice.reducer;
