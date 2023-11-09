const express = require("express");
const router = express.Router();
const errorsController = require("../controllers/ErrorsController");

router.get("/", errorsController.getUserErrors);
router.delete("/", errorsController.deleteError);

router.get("/errorlist", errorsController.getAllErrors);
router.get("/errorlist/replies", errorsController.getErrorsReplies);
router.post();

router.post("/write", errorsController.writeError);
router.get("/count", errorsController.getUserErrorsCount);

module.exports = router;
