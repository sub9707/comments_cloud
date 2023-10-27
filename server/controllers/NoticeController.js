const NoticeModel = require("../models/Notices");
const getTodayFormat = require("../config/Calculation");

class NoticeController {
  /**
   * 모든 공지 데이터 가져오기
   *
   * @param {request}
   * @param {response}
   * @method GET
   *
   * @returns {array}
   */
  static getAllNotices = async (req, res) => {
    try {
      let results = await NoticeModel.getNotices();
      if (results) res.send(results);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  };
  /**
   * 공지 데이터 등록
   *
   * @param {request}
   * @param {response}
   * @method POST
   *
   */
  static writeNotice = async (req, res) => {
    try {
      const createDate = getTodayFormat();
      const { title, content, imgUrls } = req.body;

      let results = await NoticeModel.writeNotice(
        title,
        content,
        createDate,
        imgUrls
      );
      if (results) res.send("공지 등록 성공! [Controller]]");
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error:[공지 등록 Controller]");
    }
  };
}

module.exports = NoticeController;
