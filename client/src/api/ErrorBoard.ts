import { ErrorWriteFormValues } from "../types/react-hook-form";
import { api } from "./axios";

/**
 * @method POST
 *  게시물 작성
 */
export const writeError = async (props: ErrorWriteFormValues) => {
  try {
    const response = await api.post("/error/write", props);
    return response.data;
  } catch (error) {
    console.error("개인 에러 등록 실패:", error);
    throw error;
  }
};
/**
 * @method PUT
 *  게시물 작성
 */
export const editError = async (props: ErrorWriteFormValues) => {
  try {
    const response = await api.put("/error/edit", props);
    return response.data;
  } catch (error) {
    console.error("개인 에러 등록 실패:", error);
    throw error;
  }
};
/**
 * @method DELETE
 *  게시물 삭제
 */
export const deleteError = async (id: number) => {
  try {
    const response = await api.delete("/error?id=${id}`);
    return response.data;
  } catch (error) {
    console.error("개인 에러 삭제 실패:", error);
    throw error;
  }
};
/**
 * @method GET
 *  개인 게시물 목록 불러오기
 */
export const getMyErrors = async (
  userId: number,
  offset: number,
  publicOnly: boolean,
  privateOnly: boolean,
  solvedOnly: boolean,
  unsolvedOnly: boolean,
  filter: string
) => {
  try {
    const response = await api.get(
      `/api/error?userId=${userId}&offset=${offset}&publicOnly=${publicOnly}&solvedOnly=${solvedOnly}&privateOnly=${privateOnly}&unsolvedOnly=${unsolvedOnly}&filter=${filter}`
    );
    return response.data;
  } catch (error) {
    console.error("개인 에러목록 불러오기 실패:", error);
    throw error;
  }
};
/**
 * @method GET
 *  개인 게시물 불러오기
 */
export const getBoardError = async (boardId: number) => {
  try {
    const response = await api.get("/error/board?boardId=${boardId}`);
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
    const response = await api.get("/error/count?userId=${userId}`);
    return response.data;
  } catch (error) {
    console.error("개인 에러 개수 실패:", error);
    throw error;
  }
};

/**
 * @method GET
 *  게시글 좋아요 체크
 */
export const checkBoradCheck = async (boardId: number, userId: number) => {
  try {
    const result = await api.get(
      `/api/error/likeCheck?boardId=${boardId}&userId=${userId}`
    );
    return result.data.isLiked;
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
    const result = await api.get(
      `/api/error/errorlist/replies/likeCheck?replyId=${replyId}&userId=${userId}`
    );
    return result.data;
  } catch (err) {
    console.log(err);
  }
};

/**
 * @method POST
 *  게시글 좋아요
 */
export const postBoardLike = async (boardId: number, userId: number) => {
  try {
    const result = await api.post(
      `/api/error/like?boardId=${boardId}&userId=${userId}`
    );
    return result.data;
  } catch (err) {
    console.log(err);
  }
};
/**
 * @method POST
 *  게시글 좋아요 취소
 */
export const postBoardCancelLike = async (boardId: number, userId: number) => {
  try {
    const result = await api.post(
      `/api/error/cancelLike?boardId=${boardId}&userId=${userId}`
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
    const result = await api.post(
      `/api/error/errorlist/replies/like?replyId=${replyId}&userId=${userId}`
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
    const result = await api.post(
      `/api/error/errorlist/replies/cancelLike?replyId=${replyId}&userId=${userId}`
    );
    return result.data;
  } catch (err) {
    console.log(err);
  }
};

/**
 * @method POST
 *  게시글 조회수
 */
export const postErrorViews = async (boardId: number) => {
  try {
    const result = await api.post("/error/view?boardId=${boardId}`);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};
