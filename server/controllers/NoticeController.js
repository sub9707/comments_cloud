const NoticeModel = require("../models/Notices");
const { getTodayFormat } = require("../config/Calculation");
const { verifyToken } = require("../config/JWT_middleware");

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
      const { title, content } = req.body;
      const files = req.files || [];
      const filesArray = Array.isArray(files) ? files : [files];
      const filePaths = filesArray.map((file) => file.location);

      let results = await NoticeModel.writeNotice(
        title,
        content,
        createDate,
        filePaths
      );
      if (results) res.send("공지 등록 성공! [Controller]]");
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error:[공지 등록 Controller]");
    }
  };

  static deleteNotice = async (req, res) => {
    try {
      const id = req.query.id;
      if (!id) {
        return res.status(400).send("id가 존재하지 않습니다.");
      }
      let result = await NoticeModel.deleteNotice(id);
      if (result) res.send("공지 삭제 성공! [Controller]]");
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error:[공지 삭제 Controller]");
    }
  };
}

module.exports = NoticeController;
