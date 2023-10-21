const express = require("express");
const usercontroller = require("../controllers/UserController");
const router = express.Router();
const { check } = require("express-validator");
const { verifyToken } = require("../config/JWT_middleware");

router.get("/", (req, res, next) => {
  res.send("hi");
});

router.get("/users", usercontroller.getalluser);
router.post("/user/register", usercontroller.registerUser);
router.delete(
  "/user/delete",
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
router.post("/user/update", usercontroller.updateUser);

module.exports = router;
