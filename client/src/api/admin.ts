import { api } from "./axios";

/**
 * @method GET
 *  DashBoard 데이터 가져오기
 */
export const getDashboardData = async () => {
  try {
    const userCountData = await api.get("/api/admin/userCount");
    const userLoginData = await api.get("/api/admin/userLogin");
    const boardCount = await api.get("/api/admin/boardCount");
    const repliesCount = await api.get("/api/admin/repliesCount");

    return {
      userCountData,
      userLoginData,
      boardCount,
      repliesCount,
    };
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    throw error;
  }
};

/**
 * @method GET
 *  DashBoard 유저 그래프 데이터 가져오기
 */
export const getUserGraphData = async () => {
  try {
    const result = await api.get("/api/admin/userGraphData");
    return result.data;
  } catch (error) {
    console.error("Error fetching dashboard user data:", error);
    throw error;
  }
};
