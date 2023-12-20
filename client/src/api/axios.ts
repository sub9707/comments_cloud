import axios from "axios";
import { persistor, store } from "../store";
import {
  DELETE_TOKEN,
  SET_TOKEN,
  selectAccessToken,
  selectExpireTime,
} from "../store/Utils/Auth";
import { getCookieToken } from "../store/Utils/Cookie";
import {
  clearUser,
  selectUserEmail,
  selectUserName,
} from "../store/Utils/User";

export const api = axios.create({
  // baseURL: "http://localhost:3001/",
  baseURL: "https://port-0-trouble-shooter-71t02clq3dokrn.sel4.cloudtype.app",
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json,",
  },
  withCredentials: true,
});

api.defaults.withCredentials = true;

// axios 요청 인터셉터 [refresh]
api.interceptors.request.use(
  async (request) => {
    const refreshToken = getCookieToken();
    const userPersist = localStorage.getItem("persist:root");
    const authTokenPersist = JSON.parse(userPersist || "");
    const userName = JSON.parse(authTokenPersist.user).data.name;
    const userEmail = JSON.parse(authTokenPersist.user).data.email;
    const access_token = JSON.parse(authTokenPersist.authToken).accessToken;
    const expiresIn = JSON.parse(authTokenPersist.authToken).expireTime;
    // refresh Token 없음 or 만료
    if (!refreshToken) {
      console.log(1);
      store.dispatch(DELETE_TOKEN());
      await persistor.purge();
      store.dispatch(clearUser());
    }
    // access 토큰 없음
    if (expiresIn === null) {
      console.log(2);
      return request;
    }
    console.log(3);
    const nowDate = new Date();
    const expiresDate = new Date(expiresIn);
    // 토큰 유효
    if (nowDate <= expiresDate) return request;
    // 만료 토큰 재발급
    const result = await axios.post(
      "https://port-0-trouble-shooter-71t02clq3dokrn.sel4.cloudtype.app",
      // "http://localhost:3001/token/refresh",
      {
        email: userEmail,
        name: userName,
      }
    );

    const authorizationHeader = access_token ? `Bearer ${access_token}` : "";
    request.headers["Authorization"] = authorizationHeader;
    return request;
  },
  async (error) => {
    console.error("에러 발생:", error);
    throw error;
  }
);
