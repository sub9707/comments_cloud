const express = require("express");
const router = express.Router();
const noticeController = require("../controllers/NoticeController");
const { upload } = require("../config/s3");
const { auth } = require("../config/JWT_middleware");

const uploadMiddleware = upload("NoticeFiles");

router.post(
  "/write",
  auth,
  uploadMiddleware.array("file", 10),
  noticeController.writeNotice
);
router.delete("/", auth, noticeController.deleteNotice);
router.get("/notices", noticeController.getAllNotices);
module.exports = router;
