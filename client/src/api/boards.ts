import axios from "./axios";

/**
 * @method GET
 *  게시물 목록 불러오기
 */
export const getAllBoards = async (offset: number) => {
  try {
    const response = await axios.get(`/board/boardList?offset=${offset}`);
    return response.data;
  } catch (error) {
    console.error("게시물 목록 불러오기 실패:", error);
    throw error;
  }
};
