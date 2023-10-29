import axios from "./axios";

/**
 * @method POST
 *  공지사항 작성
 */
export const writeNotice = async (title: string, content: string) => {
  try {
    const response = await axios.post("/notice/write", {
      title: title,
      content: content,
    });
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
    const response = await axios.delete(`/notice?id=${id}`);
    return response.data;
  } catch (error) {
    console.error("공지 삭제 실패:", error);
    throw error;
  }
};
