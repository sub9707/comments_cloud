import axios from "./axios";

/**
 * @method POST
 *  사용자 회원가입
 */
const registerUser = async (name: string, email: string, password: string) => {
  try {
    const response = await axios.post("/user/register", {
      name: name,
      email: email,
      password: password,
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
  try {
    const response = await axios.post(`/login`, data);
    if (response.status === 200) {
      return response.data;
    } else {
      // 오류 응답 처리
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.error("로그인 중 에러 발생 [Client Error: Login]");
  }
};
