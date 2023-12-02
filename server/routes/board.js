const express = require("express");
const BoardController = require("../controllers/boardController");
const router = express.Router();

// 최신순으로 offset 6개
router.get("/boardList", BoardController.getAllBoards);
// 인기순 5개
// 조회수

module.exports = router;
