import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CommentData } from "../../types/BoardTypes";
import axios from "../../api/axios";

const initialState: CommentData[] = [];

/**
 * Comments State는 답글 Reply마다 달린 대댓글 데이터입니다.
 */

export const fetchComments = createAsyncThunk(
  "replies/fetchComments",
  async (commentId: number) => {
    const response = await axios.get(
      `/error/errorlist/comments?commentId=${commentId}`
    );
    return response.data;
  }
);

export const fetchCommentsCount = createAsyncThunk(
  "replies/fetchComments/count",
  async (replyId: number) => {
    const response = await axios.get(
      `/error/errorlist/comments/count?replyId=${replyId}`
    );
    return response.data;
  }
);

export const addComment = createAsyncThunk(
  "replies/addReply",
  async ({
    replyId,
    writerId,
    content,
  }: {
    replyId: number;
    writerId: number;
    content: string;
  }) => {
    // 새로운 ReplyData를 추가
    const response = await axios.post(
      `/error/errorlist/replies?replyId=${replyId}&writerId=${writerId}`,
      content,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  }
);

export const updateComment = createAsyncThunk(
  "replies/updateComment",
  async ({ replyId, content }: { replyId: number; content: string }) => {
    const response = await axios.put(
      `/error/errorlist/comments?commentId=${replyId}`,
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

export const deleteComment = createAsyncThunk(
  "replies/deleteComment",
  async (replyId: number) => {
    await axios.delete(`/error/errorlist/comments?commentId=${replyId}`);
    return replyId;
  }
);

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(fetchCommentsCount.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        const updatedComment = action.payload;
        const existingCommentIndex = state.findIndex(
          (reply) => reply.id === updatedComment.id
        );
        if (existingCommentIndex !== -1) {
          state[existingCommentIndex] = updatedComment;
        }
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        const deletedCommentId = action.payload;
        const indexToDelete = state.findIndex(
          (reply) => reply.id === deletedCommentId
        );
        if (indexToDelete !== -1) {
          state.splice(indexToDelete, 1);
        }
      });
  },
});

export default commentsSlice.reducer;
