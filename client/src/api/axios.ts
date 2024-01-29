import axios from "axios";
import { getCookieToken, removeCookieToken } from "@/store/Utils/Cookie";
import { getRefreshedToken } from "./token";
import { persistor, store } from "@/store";
import { DELETE_TOKEN, SET_TOKEN } from "@/store/Utils/Auth";

export const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json,",
  },
  withCredentials: true,
});

const userPersist = localStorage.getItem("persist:root");
const authTokenPersist = JSON.parse(userPersist || "");
const access_token = JSON.parse(authTokenPersist.authToken).accessToken;

const refreshToken = getCookieToken();

// axios 요청 인터셉터
api.interceptors.request.use(
  function (config) {
    if (access_token) {
      config.headers.Authorization = `Bearer ${access_token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// axios 응답 인터셉터
api.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    // 토큰이 만료된 상태라면 새 토큰 발급
    if (
      error.reponse.status === 419 &&
      !originalRequest._retry &&
      access_token
    ) {
      // refreshToken이 없다면(만료) 로그아웃 후 에러 리턴
      if (!refreshToken) {
        store.dispatch(DELETE_TOKEN());
        removeCookieToken();
        await persistor.purge();
        alert("토큰이 만료되었습니다. 로그인해주세요.");
        return error;
      }
      originalRequest._retry = true;
      // refreshToken이 있다면 새 AccessToken 발급
      const newAccessToken = await getRefreshedToken();
      if (newAccessToken) {
        store.dispatch(SET_TOKEN(newAccessToken));
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axios(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);
