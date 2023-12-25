const express = require("express");
const router = express.Router();
const errorsController = require("../controllers/ErrorsController");
const { auth } = require("../config/JWT_middleware");

/**
 * Route : /error
 */
router.get("/", errorsController.getUserErrors);
router.delete("/", auth, errorsController.deleteError);
router.get("/board", errorsController.getBoardError);
router.get("/likeCheck", auth, errorsController.getBoardLiked);
router.post("/write", auth, errorsController.writeError);
router.put("/edit", auth, errorsController.editError);
router.get("/count", errorsController.getUserErrorsCount);
router.post("/view", errorsController.postViewCount);
router.get("/myError", auth, errorsController.getMySearchData);
router.post("/like", auth, errorsController.postBoardLike);
router.post("/cancelLike", auth, errorsController.postBoardCancelLike);

/**
 * Route : /error/errorlist
 */
router.get("/errorlist", errorsController.getAllErrors);
router.get("/errorlist/replies", errorsController.getErrorsReplies);
router.post("/errorlist/replies", auth, errorsController.writeReply);
router.delete("/errorlist/replies", auth, errorsController.deleteReply);
router.put("/errorlist/replies", errorsController.updateReply);
router.post("/errorlist/replies/like", auth, errorsController.postReplyLike);
router.post(
  "/errorlist/replies/cancelLike",
  auth,
  errorsController.postReplyCancelLike
);
router.get("/errorlist/replies/count", errorsController.getRepliesCount);
router.get(
  "/errorlist/replies/likeCheck",
  auth,
  errorsController.getReplyLikeCheck
);

module.exports = router;
