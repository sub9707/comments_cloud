const userModel = require("../models/User");
const { s3 } = require("../config/s3");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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
      const { name, email, password, registerDate } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const EmailCheck = await userModel.getUserInfoByEmail(email);

      if (EmailCheck) {
        return res.status(500).send("이미 사용 중인 이메일입니다.");
      }
      const results = await userModel.registerUser(
        name,
        email,
        hashedPassword,
        registerDate
      );
      if (results) {
        res.send("유저 등록 성공! [Controller]");
      }
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
      const userId = req.query.userId;
      const { name, nickname, homepage, profile_message, curImageUrl } =
        req.body;
      const Img = req.file;
      const newDate = new Date();
      console.log("body", JSON.stringify(req.body));
      if (
        curImageUrl !==
        "https://trouble-shooting-dev.s3.ap-northeast-2.amazonaws.com/userProfile/1699423635934_Default_ProfileImg.png"
      ) {
        console.log("deleted");
        const decodedUrl = decodeURIComponent(curImageUrl);
        const filename = decodedUrl.split("/").pop();
        const params = {
          Bucket: process.env.BUCKET_NAME,
          Key: `userProfile/${filename}`,
        };
        s3.deleteObject(params, (err, data) => {
          if (err) {
            console.error(err);
            res.status(500).send("Error deleting file from S3");
            return;
          }
          console.log("File deleted successfully from S3");
        });
      }
      let results = await userModel.updateUser(
        name,
        nickname,
        homepage,
        profile_message,
        Img.location,
        newDate,
        userId
      );
      if (results) res.send("유저정보 수정 성공! [Controller]");
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
        const userInfo = await userModel.getUserInfoByEmail(email);
        // "access token" 발급
        const accessToken = jwt.sign(
          {
            email: user.email,
            name: user.name,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "15m",
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
            expiresIn: "1d",
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
          userId: user.id,
        });
      } else {
        res.status(401).send("로그인 정보가 일치하지 않습니다.");
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error: User Login");
    }
  };

  static getUserInfo = async (req, res) => {
    const userId = req.query.userId;
    try {
      const result = await userModel.getUserInfoById(userId);
      if (result) res.send(result);
      else res.send("유저 Info SQL Error");
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error:[유저 info Controller]");
    }
  };
  static userFindById = async (req, res) => {
    const userId = req.query.userId;
    try {
      const result = await userModel.findUserById(userId);
      if (result) res.send(result);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error:[유저 find Controller]");
    }
  };

  static imageTest = async (req, res, next) => {
    const Img = req.file;
    console.log("s3 Image URL: ", Img.location);
    res.json({ s3ImageUrl: Img.location });
  };
}

module.exports = UserController;
