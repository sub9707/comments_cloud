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
});

// axios 요청 인터셉터 [refresh]
api.interceptors.request.use(
  async (request) => {
    const userName = selectUserName(store.getState());
    const userEmail = selectUserEmail(store.getState());
    const access_token_Data = selectAccessToken(store.getState());
    const expiresIn = selectExpireTime(store.getState());
    const refreshToken = getCookieToken();
    const userPersist = localStorage.getItem("persist:root");
    const authTokenPersist = JSON.parse(userPersist || "");
    console.log(authTokenPersist);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const access_token = access_token_Data?.data.accessToken;
    console.log("2" + authTokenPersist.accessToken);
    // refresh Token 없음 or 만료
    if (!refreshToken) {
      store.dispatch(DELETE_TOKEN());
      await persistor.purge();
      store.dispatch(clearUser());
    }
    // access 토큰 없음
    if (expiresIn === null) {
      return request;
    }

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
