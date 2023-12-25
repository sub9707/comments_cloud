const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/adminController");
const { auth } = require("../config/JWT_middleware");

// DashBoard
// 오늘 가입자 수 / 총 가입자 수
router.get("/userCount", auth, AdminController.getUserCount);
// 오늘 접속자 수
router.get("/userLogin", auth, AdminController.getLoginCount);
// 오늘 작성 수 / 총 게시물 수
router.get("/boardCount", auth, AdminController.getBoardCount);
// 오늘 달린 댓글 수 /총 댓글 수
router.get("/repliesCount", auth, AdminController.getRepliesCount);

// 유저 추세 그래프 데이터
router.get("/userGraphData", auth, AdminController.getUserGraphData);

module.exports = router;
