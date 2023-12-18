const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/adminController");

// DashBoard
// 오늘 가입자 수 / 총 가입자 수
router.get("/userCount", AdminController.getUserCount);
// 오늘 접속자 수
router.get("/userLogin", AdminController.getLoginCount);
// 오늘 작성 수 / 총 게시물 수
router.get("/boardCount", AdminController.getBoardCount);
// 오늘 달린 댓글 수 /총 댓글 수
router.get("/repliesCount", AdminController.getRepliesCount);

// 유저 추세 그래프 데이터
router.get("/userGraphData", AdminController.getUserGraphData);

module.exports = router;
