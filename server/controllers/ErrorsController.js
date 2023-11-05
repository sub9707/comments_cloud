const { getTodayTimeFormat } = require("../config/Calculation");
const ErrorsModel = require("../models/Errors");

class ErrorsController {
  /**
   * 모든 에러게시물 가져오기
   *
   * @param {request}
   * @param {response}
   * @method GET
   *
   * @returns {array}
   */
  static getAllErrors = async (req, res) => {
    try {
      let results = await ErrorsModel.getAllErrors();
      if (results) res.send(results);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  };
  /**
   * 특정 사용자 에러게시물 가져오기
   *
   * @param {request}
   * @param {response}
   * @method GET
   *
   * @returns {array}
   */
  static getUserErrors = async (req, res) => {
    const userId = req.query.userId;
    try {
      let results = await ErrorsModel.getAllErrors();
      if (results) res.send(results);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  };
  /**
   * 에러 게시물 등록
   *
   * @param {request}
   * @param {response}
   * @method POST
   *
   */
  static writeError = async (req, res) => {
    try {
      const write_date = getTodayTimeFormat();
      const {
        title,
        error_state,
        error_cause,
        error_process,
        error_solved,
        error_result,
        writer_id,
        publicCheck,
      } = req.body;
      let results = await ErrorsModel.writeError(
        title,
        error_state,
        error_cause,
        error_process,
        error_solved,
        error_result,
        write_date,
        writer_id,
        publicCheck
      );
      if (results) res.send("게시물 등록 성공! [ErrorsController]]");
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send("Internal Server Error:[게시물 등록 ErrorsController]");
    }
  };
  static deleteError = async (req, res) => {
    try {
      const id = req.query.id;
      if (!id) {
        return res.status(400).send("id가 존재하지 않습니다.");
      }
      let result = await ErrorsModel.deleteError(id);
      if (result) res.send("에러 게시글 삭제 성공! [Controller]]");
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error:[게시물 삭제 Controller]");
    }
  };
}

module.exports = ErrorsController;
