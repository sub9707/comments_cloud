const express = require("express");
const router = express.Router();
const errorsController = require("../controllers/ErrorsController");

router.get("/errorlist", errorsController.getAllErrors);
router.get("/errorlist/replies", errorsController.getErrorsReplies);
router.post("/write", errorsController.writeError);
router.delete("/", errorsController.deleteError);
router.get("/", errorsController.getUserErrors);
router.get("/count", errorsController.getUserErrorsCount);

module.exports = router;
