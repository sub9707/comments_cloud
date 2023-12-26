const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

// 토큰 직접 전달 방식
exports.verifyToken = (token) => {
  if (!token) {
    return {
      code: 401,
      message: "토큰이 없습니다.",
    };
  }
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return {
      code: 200,
      message: "유효한 토큰입니다.",
    };
  } catch (error) {
    console.log(error.name);
    if (error.name === "TokenExpiredError") {
      return {
        code: 419,
        message: "만료된 토큰입니다.",
      };
    }
    return {
      code: 401,
      message: "유효하지 않은 토큰입니다.",
    };
  }
};

// 토큰 req 헤더 방식
exports.auth = (req, res, next) => {
  console.log("this" + req.headers.authorization);
  const token = req.headers.authorization.split(" ")[1];
  try {
    req.decoded = jwt.verify(token, SECRET_KEY);
    return next();
  } catch (error) {
    // 유효시간이 초과
    if (error.name === "TokenExpiredError") {
      return res.status(419).json({
        code: 419,
        message: "토큰이 만료되었습니다.",
      });
    }
    // 토큰의 비밀키 불일치
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        code: 401,
        message: "유효하지 않은 토큰입니다.",
      });
    }
  }
};
