import { api } from "./axios";

/**
 * @method POST
 *  공지사항 작성
 */
export const writeNotice = async (formData: FormData) => {
  try {
    const response = await api.post("/notice/write", formData);
    return response.data;
  } catch (error) {
    console.error("공지 등록 실패:", error);
    throw error;
  }
};

/**
 * @method DELETE
 *  공지사항 삭제
 */
export const deleteNotice = async (id: number) => {
  try {
    const response = await api.delete(`/notice?id=${id}`);
    return response.data;
  } catch (error) {
    console.error("공지 삭제 실패:", error);
    throw error;
  }
};
