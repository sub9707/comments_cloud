const express = require("express");
const router = express.Router();
const errorsController = require("../controllers/ErrorsController");

router.get("/errorlist", errorsController.getAllErrors);
router.post("/write", errorsController.writeError);
router.delete("/", errorsController.deleteError);
router.get("/", errorsController.getUserErrors);

module.exports = router;
