const express = require("express");
const router = express.Router();
const errorsController = require("../controllers/ErrorsController");

router.get("/", errorsController.getUserErrors);
router.delete("/", errorsController.deleteError);

router.post("/write", errorsController.writeError);
router.get("/count", errorsController.getUserErrorsCount);

router.get("/errorlist", errorsController.getAllErrors);
router.get("/errorlist/replies", errorsController.getErrorsReplies);
router.post("/errorlist/replies", errorsController.writeReply);
router.delete("/errorlist/replies", errorsController.deleteReply);
router.put("/errorlist/replies", errorsController.updateReply);

router.get("/errorlist/comments", errorsController.getErrorsComments);
router.post("/errorlist/comments", errorsController.writeComment);
router.put("/errorlist/comments", errorsController.updateComment);
router.delete("/errorlist/comments", errorsController.deleteComment);

module.exports = router;
