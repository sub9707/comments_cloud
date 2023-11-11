import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReplyData } from "../../types/BoardTypes";

interface ReplyDataState {
  replies: ReplyData[];
}

const initialState: ReplyDataState = {
  replies: [],
};

const ReplyDataSlice = createSlice({
  name: "reply",
  initialState,
  reducers: {
    postReply: (state, action: PayloadAction<ReplyData>) => {
      state.replies.push(action.payload);
    },
    updateReply: (state, action: PayloadAction<ReplyData>) => {
      const index = state.replies.findIndex(
        (reply) => reply.id === action.payload.id
      );
      if (index !== -1) {
        state.replies[index] = action.payload;
      }
    },
    removeReply: (state, action: PayloadAction<number>) => {
      state.replies = state.replies.filter(
        (reply) => reply.id !== action.payload
      );
    },
  },
});

export const { postReply, updateReply, removeReply } = ReplyDataSlice.actions;

export default ReplyDataSlice.reducer;
