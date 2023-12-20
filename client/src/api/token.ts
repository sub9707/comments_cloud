import { getCookieToken } from "../store/Utils/Cookie";
import { api } from "./axios";

/**
 * @method POST
 * 토큰 갱신
 */
export const getRefreshedToken = async () => {
  const userPersist = localStorage.getItem("persist:root");
  const authTokenPersist = JSON.parse(userPersist || "");
  const userName = JSON.parse(authTokenPersist.user).data.name;
  const userEmail = JSON.parse(authTokenPersist.user).data.email;
  const refreshToken = getCookieToken();
  try {
    const response = await api.post("/token/refresh", {
      refreshToken: `${refreshToken}`,
      email: userEmail,
      name: userName,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
