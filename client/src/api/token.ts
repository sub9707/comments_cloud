import { getCookieToken } from "@/store/Utils/Cookie";
import { api } from "./axios";

type TokenType = {
  code: 200 | 401 | 500;
  message: string;
  accessToken: string;
  expiresIn: number;
};

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

const TOKEN_KEY = "access_token";

export const setAccessToken = (token: TokenType) => {
  try {
    const currentTime = new Date().getTime();
    const expiresIn = currentTime + token.expiresIn;

    const tokenData = {
      accessToken: token.accessToken,
      expireTime: token.expiresIn.toString(),
      expiresIn,
    };
    localStorage.setItem(TOKEN_KEY, JSON.stringify(tokenData));
  } catch (error) {
    console.error("Access Token 저장 중 에러:", error);
  }
};

export const getAccessToken = (): string | null => {
  try {
    const tokenDataJSON = localStorage.getItem(TOKEN_KEY);
    if (!tokenDataJSON) {
      return null;
    }

    const tokenData = JSON.parse(tokenDataJSON);

    if (parseInt(tokenData.expiresIn) < new Date().getTime()) {
      localStorage.removeItem(TOKEN_KEY);
      return null;
    }

    return tokenData.accessToken;
  } catch (error) {
    console.error("Access Token 로드 중 에러:", error);
    return null;
  }
};

export const deleteAccessToken = () => {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.error("Access Token 삭제 중 에러:", error);
  }
};
