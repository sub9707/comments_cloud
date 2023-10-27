const express = require("express");
const router = express.Router();
const noticeController = require("../controllers/NoticeController");

router.post("/write", noticeController.writeNotice);
router.get("/notices", noticeController.getAllNotices);
module.exports = router;
