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
        issuer: "Trouble_Shooter",
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

router.post("/refresh", async (req, res) => {
  try {
    const { email, name } = req.body;

    // 토큰 재발급
    const newAccessToken = jwt.sign(
      {
        email,
        name,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "15m",
        issuer: "Trouble_Shooter",
      }
    );
    const expiresIn = 15 * 60;
    return res.json({
      code: 200,
      message: "토큰이 갱신되었습니다.",
      accessToken: newAccessToken,
      expiresIn,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      message: "서버 에러",
    });
  }
});

module.exports = router;
