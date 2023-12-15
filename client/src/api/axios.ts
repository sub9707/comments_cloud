import axios from "axios";
import { persistor, store } from "../store";
import {
  DELETE_TOKEN,
  selectAccessToken,
  selectExpireTime,
} from "../store/Utils/Auth";
import { getCookieToken, removeCookieToken } from "../store/Utils/Cookie";
import {
  clearUser,
  selectUserEmail,
  selectUserName,
} from "../store/Utils/User";

export const api = axios.create({
  baseURL: "http://localhost:3001",
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
    const access_token = selectAccessToken(store.getState());
    const expiresIn = selectExpireTime(store.getState());
    const refreshToken = getCookieToken();

    console.log("RT:" + refreshToken);

    // refresh Token 없음 or 만료
    if (!refreshToken) {
      store.dispatch(DELETE_TOKEN());
      await persistor.purge();
      store.dispatch(clearUser());
    }
    // 토큰 없음
    if (expiresIn === null) {
      return request;
    }

    const nowDate = new Date();
    const expiresDate = new Date(expiresIn);
    // 토큰 유효
    if (nowDate <= expiresDate) return request;

    console.log("토큰 맛감");
    // 만료 토큰 재발급
    const result = await axios.post("http://localhost:3001/token/refresh", {
      email: userEmail,
      name: userName,
    });
    console.log(result);
    console.log("Token 갱신완료");

    const authorizationHeader = access_token ? `Bearer ${access_token}` : "";
    request.headers["Authorization"] = authorizationHeader;

    return request;
  },
  async (error) => {
    console.error("에러 발생:", error);
    throw error;
  }
);

// // axios 요청 인터셉터 [refresh]
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (error.config && error.response && error.response.status === 401) {
//       const originalRequest = error.config;
//       if (!originalRequest._retry) {
//         originalRequest._retry = true;
//         try {
//           const refreshToken = getCookieToken();
//           const response = await axios.post(
//             "http://localhost:3001/token/refresh",
//             {
//               refreshToken,
//             },
//             {
//               headers: {
//                 RefreshToken: refreshToken,
//                 "Content-Type": "application/json",
//                 withCredentials: true,
//               },
//             }
//           );
//           console.log("Response: " + response.data);
//           const newAccessToken = response.data.accessToken;
//           store.dispatch(SET_TOKEN(newAccessToken));
//           originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//           return api(originalRequest);
//         } catch (refreshError) {
//           console.error(refreshError);
//           removeCookieToken();
//           throw refreshError;
//         }
//       }
//     }
//     return Promise.reject(error);
//   }
// );
