import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ErrorReplyType, ReplyData } from "../../types/BoardTypes";
import axios from "../../api/axios";

const initialState: ReplyData[] = [];

export const fetchReplies = createAsyncThunk(
  "replies/fetchReplies",
  async (boardId: number) => {
    const response = await axios.get(
      `/error/errorlist/replies?boardId=${boardId}`
    );
    return response.data;
  }
);

export const addReply = createAsyncThunk(
  "replies/addReply",
  async (props: ErrorReplyType) => {
    // 새로운 ReplyData를 추가
    const response = await axios.post("/error/errorlist/replies", props, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  }
);

export const updateReply = createAsyncThunk(
  "replies/updateReply",
  async ({ replyId, content }: { replyId: number; content: string }) => {
    const response = await axios.put(
      `/error/errorlist/replies?commentId=${replyId}`,
      { content },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  }
);

export const deleteReply = createAsyncThunk(
  "replies/deleteReply",
  async (replyId: number) => {
    await axios.delete(`/error/errorlist/replies?commentId=${replyId}`);
    return replyId;
  }
);

const repliesSlice = createSlice({
  name: "replies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReplies.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(addReply.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(updateReply.fulfilled, (state, action) => {
        const updatedReply = action.payload;
        const existingReplyIndex = state.findIndex(
          (reply) => reply.id === updatedReply.id
        );
        if (existingReplyIndex !== -1) {
          state[existingReplyIndex] = updatedReply;
        }
      })
      .addCase(deleteReply.fulfilled, (state, action) => {
        const deletedReplyId = action.payload;
        const indexToDelete = state.findIndex(
          (reply) => reply.id === deletedReplyId
        );
        if (indexToDelete !== -1) {
          state.splice(indexToDelete, 1);
        }
      });
  },
});

export default repliesSlice.reducer;
