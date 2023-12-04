import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ErrorReplyType, ReplyData } from "../../types/BoardTypes";
import axios from "../../api/axios";

const initialState: ReplyData[] = [];

/**
 * Reply State는 게시글마다 달린 답글 데이터입니다.
 */

export const fetchReplies = createAsyncThunk(
  "replies/fetchReplies",
  async ({ boardId, offset }: { boardId: number; offset: number }) => {
    const response = await axios.get(
      `/error/errorlist/replies?boardId=${boardId}&offset=${offset}`
    );
    return response.data;
  }
);

export const fetchRepliesCount = createAsyncThunk(
  "replies/fetchReplies/count",
  async (contentId: number) => {
    const response = await axios.get(
      `/errorlist/replies/count?contentId=${contentId}`
    );
    return response.data;
  }
);

export const addReply = createAsyncThunk(
  "replies/addReply",
  async (props: ErrorReplyType) => {
    try {
      const response = await axios.post(
        "/error/errorlist/replies",
        {
          content: props.content,
          writer_id: props.writer_id,
          content_id: props.content_id,
        },
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error: any) {
      console.error("답글 추가 중 오류 발생:", error);
      throw error;
    }
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
  reducers: {
    clearReplies: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReplies.fulfilled, (state, action) => {
        return [...state, ...action.payload];
      })
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      .addCase(fetchRepliesCount.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(addReply.fulfilled, (state, action) => {
        const { data } = action.payload;
        return [...state, { ...data, nickname: "방금 작성한 댓글", likes: 0 }];
      })
      .addCase(updateReply.fulfilled, (state, action) => {
        const { data } = action.payload;
        const { commentId, content } = data;

        return state.map((reply) => {
          if (reply.id == commentId) {
            return { ...reply, content };
          }
          return reply;
        });
      })
      .addCase(deleteReply.fulfilled, (state, action) => {
        const deletedReplyId = action.payload;

        const updatedState = state.filter((reply) => {
          return reply.id !== deletedReplyId;
        });

        console.log("Updated State:", updatedState);

        state = updatedState;
        return state;
      });
  },
});
export const { clearReplies } = repliesSlice.actions;

export default repliesSlice.reducer;
