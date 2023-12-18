const AdminModel = require("../models/admin");

class AdminController {
  /**
   * 오늘 가입자 수 / 총 가입자 수
   *
   * @param {res}
   * @method GET
   *
   * @returns {array}
   */
  static getUserCount = async (req, res) => {
    try {
      let results = await AdminModel.getUserCount();
      if (results) res.send(results);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  };
  /**
   * // 오늘 접속자 수
   *
   * @param {request}
   * @method GET
   *
   * @returns {array}
   */
  static getLoginCount = async (req, res) => {
    try {
      let results = await AdminModel.getLoginCount();
      if (results) res.send(results);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  };
  /**
   * 오늘 작성 수 / 총 게시물 수
   *
   * @param {request}
   * @method GET
   *
   * @returns {array}
   */
  static getBoardCount = async (req, res) => {
    try {
      let results = await AdminModel.getBoardCount();
      if (results) res.send(results);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  };
  /**
   * 오늘 달린 댓글 수 /총 댓글 수
   *
   * @param {request}
   * @method GET
   *
   * @returns {array}
   */
  static getRepliesCount = async (req, res) => {
    try {
      let results = await AdminModel.getRepliesCount();
      if (results) res.send(results);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  };
  /**
   * 유저 추세 그래프 데이터
   *
   * @param {request}
   * @method GET
   *
   * @returns {array}
   */
  static getUserGraphData = async (req, res) => {
    try {
      let results = await AdminModel.getUserGraphData();
      if (results) res.send(results);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  };
}
module.exports = AdminController;
