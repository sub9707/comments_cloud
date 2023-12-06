const express = require("express");
const BoardController = require("../controllers/boardController");
const router = express.Router();

// RankBox
// 최신순으로 offset 6개
router.get("/boardList", BoardController.getAllBoards);
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
