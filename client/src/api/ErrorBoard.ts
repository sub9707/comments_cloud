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
    console.error("공지 등록 실패:", error);
    throw error;
  }
};
