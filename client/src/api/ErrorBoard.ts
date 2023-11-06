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
