const BoardModel = require("../models/board");

class BoardController {
  /**
   * 커뮤니티 게시물 가져오기
   *
   * @param {request: offset}
   * @param {response}
   * @method GET
   *
   * @returns {array}
   */
  static getAllBoards = async (req, res) => {
    const offset = req.query.offset;
    const filter = req.query.filter;
    try {
      let results = await BoardModel.getAllBoards(offset, filter);
      if (results) res.send(results);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  };
  /**
   * 커뮤니티 게시물 가져오기[admin]
   *
   * @param {request: offset}
   * @param {response}
   * @method GET
   *
   * @returns {array}
   */
  static getEntireBoards = async (req, res) => {
    try {
      let results = await BoardModel.getEntireBoards();
      if (results) res.send(results);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  };
  /**
   * 커뮤니티 게시물 랭킹
   *
   * @param {request}
   * @param {response}
   * @method GET
   *
   * @returns {array}
   */
  static getDailyRank = async (req, res) => {
    try {
      let results = await BoardModel.getDailyRank();
      if (results) res.send(results);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  };
  static getWeeklyRank = async (req, res) => {
    try {
      let results = await BoardModel.getWeeklyRank();
      if (results) res.send(results);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  };
  static getMonthlyRank = async (req, res) => {
    try {
      let results = await BoardModel.getMonthlyRank();
      if (results) res.send(results);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  };
  static getSearchBoards = async (req, res) => {
    const search = req.query.search;
    const offset = req.query.offset;
    try {
      let results = await BoardModel.getSearchBoard(search, +offset);
      if (results) res.send(results);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  };
}

module.exports = BoardController;
