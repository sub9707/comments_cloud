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
 * @method GET
 *  게시물 댓글 불러오기
 */
export const getMyErrorReplies = async (boardId: number) => {
  try {
    const response = await axios.get(
      `/error/errorlist/replies?boardId=${boardId}`
    );
    return response.data;
  } catch (error) {
    console.error("댓글 load 실패:", error);
    throw error;
  }
};
