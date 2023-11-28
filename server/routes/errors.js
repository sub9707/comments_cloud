const express = require("express");
const router = express.Router();
const errorsController = require("../controllers/ErrorsController");

router.get("/", errorsController.getUserErrors);
router.get("/board", errorsController.getBoardError);
router.delete("/", errorsController.deleteError);

router.post("/write", errorsController.writeError);
router.get("/count", errorsController.getUserErrorsCount);
router.post("/view", errorsController.postViewCount);
router.get("/myError", errorsController.getMySearchData);
router.get("/errorlist", errorsController.getAllErrors);
router.get("/errorlist/replies", errorsController.getErrorsReplies);
router.post("/errorlist/replies", errorsController.writeReply);
router.delete("/errorlist/replies", errorsController.deleteReply);
router.put("/errorlist/replies", errorsController.updateReply);
router.post("/errorlist/replies/like", errorsController.postReplyLike);
router.post(
  "/errorlist/replies/cancelLike",
  errorsController.postReplyCancelLike
);
router.get("/errorlist/replies/count", errorsController.getRepliesCount);
router.get("/errorlist/replies/likeCheck", errorsController.getReplyLikeCheck);

router.get("/errorlist/comments/count", errorsController.getCommentsCount);
router.get("/errorlist/comments", errorsController.getErrorsComments);
router.post("/errorlist/comments", errorsController.writeComment);
router.put("/errorlist/comments", errorsController.updateComment);
router.delete("/errorlist/comments", errorsController.deleteComment);
router.delete("/errorlist/commentsall", errorsController.deleteCommentsAll);

module.exports = router;
