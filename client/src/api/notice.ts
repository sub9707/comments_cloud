import axios from "./axios";

/**
 * @method POST
 *  공지사항 작성
 */
const writeNotice = async (title: string, content: string) => {
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

export default writeNotice;
