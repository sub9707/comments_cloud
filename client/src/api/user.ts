import { UpdateUserInfoType } from "../types/users";
import { api } from "./axios";

/**
 * @method POST
 *  사용자 회원가입
 */
const registerUser = async (email: string, name: string, password: string) => {
  const today = new Date();
  const registerDate = `${today.getFullYear()}.${today.getMonth()}.${today.getDay()}`;
  try {
    const response = await api.post("/user/register", {
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
  const response = await api.post(`/user/login`, data);
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
    const response = await api.get(`/user?userId=${userId}`);
    return response.data;
  } catch (err) {
    console.error(err);
    throw new Error("사용자 정보 조회 오류: api");
  }
};
/**
 * @method POST
 *  사용자 비밀번호 확인
 */
export const checkPassword = async (userId: string, password: string) => {
  const data = { userId, password };
  try {
    const response = await api.post(`/user/pwCheck`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("사용자 비밀번호 확인");
  }
};
/**
 * @method PUT
 *  사용자 비밀번호 변경
 */
export const passwordChange = async (userId: string, password: string) => {
  const data = { userId, password };
  try {
    const response = await api.post(`/user/pwCheck`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("사용자 비밀번호 확인");
  }
};
/**
 * @method DELETE
 *  사용자 삭제
 */
export const deleteUser = async (userId: number) => {
  try {
    const response = await api.delete(`/user?userId=${userId}`);
    return response.data;
  } catch (err) {
    console.error(err);
    throw new Error("사용자 정보 조회 오류: api");
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
    if (profileImage) {
      formData.append("profileImg", profileImage);
    }

    formData.append("name", props.name);
    formData.append("nickname", props.nickname);
    formData.append("homepage", props.homepage);
    formData.append("profile_message", props.profile_message);
    formData.append("curImageUrl", props.curImageUrl);

    const response = await api.put(`/user?userId=${userId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        ...props.headers,
      },
    });

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
    const response = await api.get(`/user/findById?userId=${userId}`);
    return response.data;
  } catch (err) {
    console.error(err);
    throw new Error("사용자 ID 조회 오류: api");
  }
};

/**
 * @method GET
 *  사용자 노트 정보 조회
 */
export const getUserNoteData = async (userId: string) => {
  try {
    const response = await api.get(`/user/noteData?userId=${userId}`);
    return response.data;
  } catch (err) {
    console.error(err);
    throw new Error("사용자 노트 정보 조회 오류: api");
  }
};
/**
 * @method GET
 *  사용자 노트 달력 데이터 조회
 *
 */
export const getCalendarData = async (userId: string) => {
  try {
    const response = await api.get(`/user/calanderData?userId=${userId}`);
    return response.data;
  } catch (err) {
    console.error(err);
    throw new Error("사용자 노트 달력 조회 오류: api");
  }
};
/**
 * @method GET
 *  사용자 최근 노트 목록
 *
 */
export const getRecentData = async (userId: string) => {
  try {
    const response = await api.get(`/user/recentNote?userId=${userId}`);
    return response.data;
  } catch (err) {
    console.error(err);
    throw new Error("사용자 최근 노트 조회 오류: api");
  }
};
/**
 * @method GET
 *  사용자 최근 좋아요 순 노트 목록
 *
 */
export const getLikedData = async (userId: string) => {
  try {
    const response = await api.get(`/user/likedNote?userId=${userId}`);
    return response.data;
  } catch (err) {
    console.error(err);
    throw new Error("사용자 최근 좋아요 순 노트 조회 오류: api");
  }
};
/**
 * @method GET
 *  좋아요 노트 공개 체크
 *
 */
export const checkLikedListPublic = async (userId: string) => {
  try {
    const response = await api.get(`/user/checkLikedPublic?userId=${userId}`);
    return response.data;
  } catch (err) {
    console.error(err);
    throw new Error("좋아요 노트 공개 체크: api");
  }
};
/**
 * @method PUT
 *  좋아요 노트 공개 변경
 *
 */
export const changeLikedListPublic = async (userId: string) => {
  try {
    console.log("in");
    const response = await api.put(`/user/LikedPublic?userId=${userId}`);
    console.log(response);
    return response.data;
  } catch (err) {
    console.error(err);
    throw new Error("좋아요 노트 공개 변경: api");
  }
};
