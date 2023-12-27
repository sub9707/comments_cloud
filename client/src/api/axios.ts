import axios from "axios";
import { getCookieToken } from "@/store/Utils/Cookie";
import { getRefreshedToken } from "./token";
import { store } from "@/store";
import { SET_TOKEN } from "@/store/Utils/Auth";

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
const access_token = authTokenPersist
  ? JSON.parse(authTokenPersist.authToken).accessToken
  : null;
const refreshToken = getCookieToken();

// axios 요청 인터셉터 [refresh]
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

api.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (
      error.reponse.status === 401 &&
      !originalRequest._retry &&
      access_token
    ) {
      if (!refreshToken) return error;
      originalRequest._retry = true;
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
