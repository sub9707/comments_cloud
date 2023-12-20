import axios from "axios";

/**
 * @method GET
 * Token 만료 체크
 */
export const checkToken = async (token: string) => {
  try {
    const response = await axios.get("/api/token/checkToken", {
      headers: {
        Authorization: token,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
