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
    const offset = req.query.offset;
    try {
      let results = await ErrorsModel.getUserErrors(
        parseInt(userId),
        parseInt(offset)
      );
      if (results) res.send(results);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  };
  /**
   * 특정 사용자 에러게시물 개수
   *
   * @param {request}
   * @param {response}
   * @method GET
   *
   * @returns {array}
   */
  static getUserErrorsCount = async (req, res) => {
    const userId = req.query.userId;
    try {
      let results = await ErrorsModel.getUserErrorsCount(parseInt(userId));
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
        tags,
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
        tags,
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
  /**
   * 특정 게시물 삭제
   *
   * @param {request}
   * @param {response}
   * @method DELETE
   *
   * @returns {array}
   */
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
  /**
   * 특정 게시물 댓글목록
   *
   * @param {request}
   * @param {response}
   * @method GET
   *
   * @returns {array}
   */
  static getErrorsReplies = async (req, res) => {
    try {
      const boardId = req.query.boardId;
      if (!boardId) {
        return res.status(400).send("BoardId가 존재하지 않습니다.");
      }
      let result = await ErrorsModel.getErrorReplies(boardId);
      if (result) res.send(result);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send("Internal Server Error:[게시물 댓글 load Controller]");
    }
  };
}

module.exports = ErrorsController;
