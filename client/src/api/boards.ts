import { api } from "./axios";

/**
 * @method GET
 *  게시물 목록 불러오기
 */
export const getAllBoards = async (offset: number, filter: string) => {
  try {
    const response = await api.get(
      `/api/board/boardList?offset=${offset}&filter=${filter}`
    );
    return response.data;
  } catch (error) {
    console.error("게시물 목록 불러오기 실패:", error);
    throw error;
  }
};
/**
 * @method GET
 *  게시물 목록 불러오기[admin]
 */
export const getEntireBoards = async () => {
  try {
    const response = await api.get(`/api/board/boardList/admin`);
    return response.data;
  } catch (error) {
    console.error("게시물 목록 불러오기 실패:", error);
    throw error;
  }
};
/**
 * @method GET
 *  게시물 랭킹 Daily 불러오기
 */
export const getDailyRanks = async () => {
  try {
    const response = await api.get(`/api/board/ranking/daily`);
    return response.data;
  } catch (error) {
    console.error("게시물 랭킹(Daily) 실패:", error);
    throw error;
  }
};
/**
 * @method GET
 *  게시물 랭킹 Weekly 불러오기
 */
export const getWeeklyRanks = async () => {
  try {
    const response = await api.get(`/api/board/ranking/weekly`);
    return response.data;
  } catch (error) {
    console.error("게시물 랭킹(weekly) 실패:", error);
    throw error;
  }
};
/**
 * @method GET
 *  게시물 랭킹 Monthly 불러오기
 */
export const getMonthlyRanks = async () => {
  try {
    const response = await api.get(`/api/board/ranking/monthly`);
    return response.data;
  } catch (error) {
    console.error("게시물 랭킹(monthly) 실패:", error);
    throw error;
  }
};
