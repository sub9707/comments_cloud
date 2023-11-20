// import { getCookieToken } from "../store/Cookie";
import axios from "./axios";

// const access_token = getCookieToken();
// const refresh_token = getCookieToken();

// // JWT Interceptor
// axios.interceptors.request.use(function (config) {
//   config.headers.common["Authorization"] = access_token;
//   config.headers.common["Refresh-Token"] = refresh_token;
//   return config;
// });

/**
 * @method POST
 *  사용자 회원가입
 */
const registerUser = async (email: string, name: string, password: string) => {
  const today = new Date();
  const registerDate = `${today.getFullYear()}.${today.getMonth()}.${today.getDay()}`;
  try {
    const response = await axios.post("/user/register", {
      name: name,
      email: email,
      password: password,
      registerDate: registerDate,
    });
    return response.data;
  } catch (error) {
    console.error("회원가입 실패:", error);
    throw error;
  }
};

export default registerUser;

/**
 * @method POST
 *  사용자 로그인
 */
export const loginUser = async (email: string, password: string) => {
  const data = { email, password };
  console.log("login data: ", data);
  const response = await axios.post(`/login`, data);
  if (response.status === 200) {
    return response.data;
  } else if (response.status === 401) {
    // Unauthorized Error: 로그인 정보 일치하지 않음
    throw new Error("로그인 정보가 일치하지 않습니다.");
  } else {
    // 기타 서버 오류 처리
    throw new Error("서버 오류");
  }
};

/**
 * @method GET
 *  사용자 정보 조회
 */
export const getUserInfo = async (userId: string) => {
  try {
    const response = await axios.get(`/user?userId=${userId}`);
    return response.data;
  } catch (err) {
    console.error(err);
    throw new Error("사용자 정보 조회 오류: AXIOS");
  }
};
