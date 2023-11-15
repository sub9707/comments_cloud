import { ErrorWriteFormValues } from "../types/react-hook-form";
import axios from "./axios";

/**
 * @method POST
 *  게시물 작성
 */
export const writeError = async (props: ErrorWriteFormValues) => {
  try {
    const response = await axios.post("/error/write", props);
    return response.data;
  } catch (error) {
    console.error("개인 에러 등록 실패:", error);
    throw error;
  }
};
/**
 * @method GET
 *  개인 게시물 불러오기
 */
export const getMyErrors = async (userId: number, offset: number) => {
  try {
    const response = await axios.get(
      `/error?userId=${userId}&offset=${offset}`
    );
    return response.data;
  } catch (error) {
    console.error("개인 에러 불러오기 실패:", error);
    throw error;
  }
};
/**
 * @method GET
 *  게시물 개수
 */
export const getMyErrorCount = async (userId: number) => {
  try {
    const response = await axios.get(`/error/count?userId=${userId}`);
    return response.data;
  } catch (error) {
    console.error("개인 에러 개수 실패:", error);
    throw error;
  }
};

/**
 * @method DELETE
 *  댓글과 연관된 대댓글 모두 삭제
 */
export const deleteCommentAll = async (replyId: number) => {
  try {
    const result = await axios.delete(
      `/error/errorlist/commentsall?replyId=${replyId}`
    );
    return result;
  } catch (error) {
    console.error(error);
  }
};

/**
 * @method GET
 *  게시물 댓글 불러오기
 */
export const getAllComments = async (commentId: number) => {
  try {
    const results = await axios.get(
      `/error/errorlist/comments?commentId=${commentId}`
    );
    return results.data;
  } catch (err) {
    console.error(err);
  }
};

/**
 * @method POST
 *  게시물 대댓글 작성
 */
export const writeComment = async (
  commentId: number,
  writerId: number,
  commentData: string
) => {
  try {
    const response = await axios.post(
      `/error/errorlist/comments?writerId=${writerId}&replyId=${commentId}`,
      { content: commentData }
    );
    return response.data;
  } catch (error) {
    console.error("개인 에러 등록 실패:", error);
    throw error;
  }
};
/**
 * @method GET
 *  대댓글 개수
 */
export const getCommentsCount = async (replyId: number) => {
  try {
    const response = await axios.get(
      `/error/errorlist/comments/count?replyId=${replyId}`
    );
    return response.data[0].count;
  } catch (error) {
    console.error("대댓글 개수 실패:", error);
    throw error;
  }
};

/**
 * @method DELETE
 *  댓글 대댓글 삭제
 */
export const deleteComment = async (commentId: number) => {
  try {
    const result = await axios.delete(
      `/error/errorlist/comments?commentId=${commentId}`
    );
    return result;
  } catch (error) {
    console.error(error);
  }
};
/**
 * @method PUT
 *  댓글 대댓글 수정
 */

export const updateComment = async (commentId: number, content: string) => {
  try {
    const result = await axios.put(
      `/error/errorlist/comments?commentId=${commentId}`,
      { content }
    );
    return result;
  } catch (err) {
    console.log(err);
  }
};

/**
 * @method GET
 *  댓글 좋아요 체크
 */
export const checkReplyCheck = async (replyId: number, userId: number) => {
  try {
    const result = await axios.get(
      `/error/errorlist/replies/likeCheck?replyId=${replyId}&userId=${userId}`
    );
    return result.data;
  } catch (err) {
    console.log(err);
  }
};

/**
 * @method POST
 *  댓글 좋아요
 */
export const postReplyLike = async (replyId: number, userId: number) => {
  try {
    const result = await axios.post(
      `/error/errorlist/replies/like?replyId=${replyId}&userId=${userId}`
    );
    return result.data;
  } catch (err) {
    console.log(err);
  }
};
/**
 * @method POST
 *  댓글 좋아요 취소
 */
export const postReplyCancelLike = async (replyId: number, userId: number) => {
  try {
    const result = await axios.post(
      `/error/errorlist/replies/cancelLike?replyId=${replyId}&userId=${userId}`
    );
    return result.data;
  } catch (err) {
    console.log(err);
  }
};
