const express = require("express");
const router = express.Router();
const noticeController = require("../controllers/NoticeController");
const { upload } = require("../config/s3");

router.post("/write", upload.array("file", 1), noticeController.writeNotice);
router.delete("/", noticeController.deleteNotice);
router.get("/notices", noticeController.getAllNotices);
module.exports = router;
