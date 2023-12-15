const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      code: 401,
      message: "토큰이 없습니다.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    req.decoded = decoded;
    return next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      req.expiredToken = true;
      req.code = 419;
      return next();
    }
    return res.status(401).json({
      code: 401,
      message: "유효하지 않은 토큰입니다.",
    });
  }
};
