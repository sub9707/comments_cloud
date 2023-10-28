const express = require("express");
const usercontroller = require("../controllers/UserController");
const router = express.Router();
const { check } = require("express-validator");
const { verifyToken } = require("../config/JWT_middleware");

router.post("/register", usercontroller.registerUser);
router.delete(
  "/delete",
  [
    check("id")
      .exists()
      .withMessage("id가 필요합니다.")
      .isNumeric()
      .withMessage("id는 정수형 데이터입니다."),
  ],
  usercontroller.deleteUser
);
router.post("/login", usercontroller.loginUser);
router.post("/update", usercontroller.updateUser);

module.exports = router;