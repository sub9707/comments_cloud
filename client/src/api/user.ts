// import { getCookieToken } from "../store/Cookie";
import { UpdateFormValue } from "../types/react-hook-form";
import { UpdateUserInfoType } from "../types/users";
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
  const response = await axios.post(`/user/login`, data);
  if (response.status === 200) {
    return response.data;
  } else if (response.status === 401) {
    throw new Error("로그인 정보가 일치하지 않습니다.");
  } else {
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
/**
 * @method PUT
 *  사용자 프로필 수정
 */
export const updateUserInfo = async (
  userId: number,
  profileImage: File,
  props: UpdateUserInfoType
) => {
  try {
    const formData = new FormData();
    formData.append("profileImg", profileImage);

    formData.append("name", props.name);
    formData.append("nickname", props.nickname);
    formData.append("homepage", props.homepage);
    formData.append("profile_message", props.profile_message);
    formData.append("curImageUrl", props.curImageUrl);

    const response = await axios.put(`/user?userId=${userId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        ...props.headers,
      },
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

/**
 * @method GET
 *  사용자 조회 ID
 */
export const userFindById = async (userId: string) => {
  try {
    const response = await axios.get(`/user/findById?userId=${userId}`);
    return response.data;
  } catch (err) {
    console.error(err);
    throw new Error("사용자 ID 조회 오류: AXIOS");
  }
};

/**
 * @method GET
 *  사용자 노트 정보 조회
 */
export const getUserNoteData = async (userId: string) => {
  try {
    const response = await axios.get(`/user/noteData?userId=${userId}`);
    return response.data;
  } catch (err) {
    console.error(err);
    throw new Error("사용자 노트 정보 조회 오류: AXIOS");
  }
};
