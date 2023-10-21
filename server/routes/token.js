const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { verifyToken } = require("../config/JWT_middleware");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { email, name } = req.body;
    // jwt.sign() 메소드: 토큰 발급
    const token = jwt.sign(
      {
        email,
        name,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "15m",
        issuer: "Kim sub",
      }
    );

    return res.json({
      code: 200,
      message: "토큰이 발급되었습니다.",
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      message: "서버 에러",
    });
  }
});

router.get("/test", verifyToken, (req, res) => {
  res.json(req.decoded);
});

module.exports = router;
