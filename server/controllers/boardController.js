const BoardModel = require("../models/board");

class BoardController {
  /**
   * 커뮤니티 게시물 최신순 가져오기
   *
   * @param {request: offset}
   * @param {response}
   * @method GET
   *
   * @returns {array}
   */
  static getAllBoards = async (req, res) => {
    const offset = req.query.offset;
    try {
      let results = await BoardModel.getAllBoards(offset);
      if (results) res.send(results);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  };
}

module.exports = BoardController;
