const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

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
