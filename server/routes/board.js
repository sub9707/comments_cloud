const express = require("express");
const router = express.Router();
const BoardController = require("../controllers/boardController");

// RankBox
// offset : 6개
router.get("/boardList", BoardController.getAllBoards);
router.get("/boardList/admin", BoardController.getEntireBoards);
// Ranking
// 일간 조회수 랭킹
router.get("/ranking/daily", BoardController.getDailyRank);
// 주간 조회수 랭킹
router.get("/ranking/weekly", BoardController.getWeeklyRank);
// 월간 조회수 랭킹
router.get("/ranking/monthly", BoardController.getMonthlyRank);

// Board Search API
router.get("/boardSearch", BoardController.getSearchBoards);

module.exports = router;
