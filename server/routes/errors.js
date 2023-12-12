const express = require("express");
const router = express.Router();
const errorsController = require("../controllers/ErrorsController");

/**
 * Route : /error
 */
router.get("/", errorsController.getUserErrors);
router.delete("/", errorsController.deleteError);
router.get("/board", errorsController.getBoardError);
router.get("/likeCheck", errorsController.getBoardLiked);
router.post("/write", errorsController.writeError);
router.put("/edit", errorsController.editError);
router.get("/count", errorsController.getUserErrorsCount);
router.post("/view", errorsController.postViewCount);
router.get("/myError", errorsController.getMySearchData);
router.post("/like", errorsController.postBoardLike);
router.post("/cancelLike", errorsController.postBoardCancelLike);

/**
 * Route : /error/errorlist
 */
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

module.exports = router;
