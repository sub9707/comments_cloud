import { createSlice } from "@reduxjs/toolkit";

export type PictureModlType = {
  picSource: string;
};

const initialState = {
  picSource: "",
};

export const pictureModalSlice = createSlice({
  name: "pictureModal",
  initialState,
  reducers: {
    setPicture: (state, actions) => {
      const picSource = actions.payload;
      state.picSource = picSource;
    },
    clearPicture: (state) => {
      state.picSource = "";
    },
  },
});

export const { setPicture, clearPicture } = pictureModalSlice.actions;
export default pictureModalSlice.reducer;
