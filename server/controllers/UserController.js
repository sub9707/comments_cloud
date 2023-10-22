const userModel = require("../models/User");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

class UserController {
  /**
   * 모든 유저 데이터 가져오기
   *
   * @param {request}
   * @param {response}
   * @method GET
   *
   * @returns {array}
   */
  static getalluser = async (req, res) => {
    try {
      let results = await userModel.getusers();
      if (results) res.send(results);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  };
  /**
   * 유저 데이터 등록
   *
   * @param {request}
   * @param {response}
   * @method POST
   *
   */
  static registerUser = async (req, res) => {
    try {
      const { name, email, password } = req.body;
      let results = await userModel.registerUser(name, email, password);
      if (results) res.send("유저 등록 성공! [Controller]");
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error:[유저 등록 Controller]");
    }
  };
  /**
   * 유저 데이터 삭제
   *
   * @param {request}
   * @param {response}
   * @method DELETE
   *
   */
  static deleteUser = async (req, res) => {
    try {
      const { id } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.json(errors.array());
      }

      if (id) {
        let results = await userModel.deleteUser(id);
        if (results) res.send("유저 삭제 성공! [Controller]");
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error:[유저 삭제 Controller]");
    }
  };
  /**
   * 유저 데이터 수정
   *
   * @param {request}
   * @param {response}
   * @method POST
   *
   */
  static updateUser = async (req, res) => {
    try {
      const { id, name, email, password } = req.body;
      const newName = name;
      const newEmail = email;
      const newPassword = password;

      if (id) {
        let results = await userModel.updateUser(
          id,
          newName,
          newEmail,
          newPassword
        );
        if (results) res.send("유저정보 수정 성공! [Controller]");
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error:[유저 수정 Controller]");
    }
  };
  /**
   * 유저 로그인
   *
   * @param {request}
   * @param {response}
   * @method POST
   *
   */
  static loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await userModel.authenticateUser(email, password);

      if (user) {
        // 유저 정보 GET
        const userInfo = await userModel.getUserInfo(email);
        // "access token" 발급
        const accessToken = jwt.sign(
          {
            email: user.email,
            name: user.name,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "15m", // 예: 15분
            issuer: "Kim sub",
          }
        );

        // "refresh token" 발급
        const refreshToken = jwt.sign(
          {
            email: user.email,
            name: user.name,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "3d", // 예: 30일
            issuer: "Kim sub",
          }
        );

        // 클라이언트에 "access token" 및 "refresh token" 반환
        res.json({
          code: 200,
          message: "로그인 성공",
          accessToken,
          refreshToken,
          user: userInfo,
        });
      } else {
        res.status(401).send("유효하지 않은 로그인 정보입니다.");
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error: User Login");
    }
  };
}

module.exports = UserController;
