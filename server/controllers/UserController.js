const userModel = require("../models/User");
const { s3 } = require("../config/s3");
const { getCurrentTime } = require("../config/Calculation");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const moment = require("moment");
moment.locale("ko", {
  week: {
    dow: 1,
  },
});

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
   * 유저 비밀번호 확인
   *
   * @param {request}
   * @param {response}
   * @method POST
   *
   */
  static getCheckPW = async (req, res) => {
    try {
      const { userId, password } = req.body;
      const results = await userModel.checkPassword(userId, password);
      res.send(results);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send("Internal Server Error:[비밀번호 유효검사 Controller]");
    }
  };
  /**
   * 유저 비밀번호 변경
   *
   * @param {request}
   * @param {response}
   * @method POST
   *
   */
  static passwordChange = async (req, res) => {
    try {
      const { userId, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const results = await userModel.passwordChange(userId, hashedPassword);
      res.send(results);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error:[비밀번호 변경 Controller]");
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
      const userId = req.query.userId;
      let results = await userModel.deleteUser(userId);
      if (results) res.send("유저 삭제 성공! [Controller]");
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

      if (
        curImageUrl !==
          "https://trouble-shooter.s3.ap-northeast-2.amazonaws.com/userProfile/Default_Images.png" &&
        Img
      ) {
        const decodedUrl = decodeURIComponent(curImageUrl);
        const filename = decodedUrl.split("/").pop();
        const params = {
          Bucket: process.env.BUCKET_NAME,
          Key: `userProfile/${filename}`,
        };

        await new Promise((resolve, reject) => {
          s3.deleteObject(params, (err, data) => {
            if (err) {
              console.error(err);
              reject("Error deleting file from S3");
            } else {
              console.log("File deleted successfully from S3");
              resolve();
            }
          });
        });
      }

      let updatedImageUrl = Img ? Img.location : curImageUrl;

      if (
        curImageUrl == updatedImageUrl &&
        curImageUrl !==
          "https://trouble-shooter.s3.ap-northeast-2.amazonaws.com/userProfile/Default_Images.png"
      ) {
        await userModel.updateUser(
          name,
          nickname,
          homepage,
          profile_message,
          curImageUrl,
          newDate,
          userId
        );
      } else {
        await userModel.updateUser(
          name,
          nickname,
          homepage,
          profile_message,
          updatedImageUrl,
          newDate,
          userId
        );
      }

      res.send("유저정보 수정 성공! [Controller]");
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
      console.log(getCurrentTime());
      const user = await userModel.authenticateUser(
        email,
        password,
        currentTime
      );
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
  /**
   * 유저 정보
   *
   * @param {request}
   * @param {response}
   * @method GET
   *
   */
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
  /**
   * 유저 ID 검색
   *
   * @param {request}
   * @param {response}
   * @method GET
   *
   */
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
  /**
   * 유저 노트정보
   *
   * @param {request}
   * @param {response}
   * @method GET
   * 1. 총 작성 에러노트 수
   * 2. 총 해결된 에러노트 수
   * 3. 총 받은 추천 수
   *  NOTE : 이후 경험치 로직을 위해 model 따로 작성할 것.
   */
  static getUserNoteData = async (req, res) => {
    const userId = req.query.userId;
    try {
      const TotalNoteCount = await userModel.getTotalNoteCount(userId);
      const TotalSolvedCount = await userModel.getTotalSolvedCount(userId);
      const TotalLikedCount = await userModel.getTotalLikedCount(userId);
      if (TotalNoteCount !== null && TotalSolvedCount !== null) {
        res.send({
          TotalNoteCount: TotalNoteCount.count,
          TotalSolvedCount: TotalSolvedCount.count,
          TotalLikedCount:
            TotalLikedCount.likes === null ? 0 : TotalLikedCount.likes,
        });
      } else {
        res
          .status(500)
          .send("Internal Server Error:[유저 Note DATA Controller]");
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error:[유저 Note DATA Controller]");
    }
  };
  /**
   * 유저 노트 일자별 개수 조회
   *
   * @param {request}
   * @param {response}
   * @method GET
   *
   **/
  static getNoteCalendar = async (req, res) => {
    const userId = req.query.userId;
    try {
      const calandarData = await userModel.getCalendarData(userId);
      res.send(calandarData);
    } catch (error) {
      console.error(error);
    }
  };
  /**
   * 유저 노트 최근 5개
   *
   * @param {request}
   * @param {response}
   * @method GET
   *
   **/
  static getRecentNotes = async (req, res) => {
    const userId = req.query.userId;
    try {
      const data = await userModel.getRecentNotes(userId);
      res.send(data);
    } catch (error) {
      console.error(error);
    }
  };
  /**
   * 유저 노트 좋아요 순 5개
   *
   * @param {request}
   * @param {response}
   * @method GET
   *
   **/
  static getLikedNotes = async (req, res) => {
    const userId = req.query.userId;
    try {
      const data = await userModel.getLikedNotes(userId);
      res.send(data);
    } catch (error) {
      console.error(error);
    }
  };
  /**
   * 유저 좋아요 누른 노트 리스트
   *
   * @param {request}
   * @param {response}
   * @method GET
   *
   **/
  static getLikedNotesList = async (req, res) => {
    const userId = req.query.userId;
    const offset = req.query.offset;
    try {
      const data = await userModel.getLikedNoteList(userId, +offset);
      res.send(data);
    } catch (error) {
      console.error(error);
    }
  };
  /**
   * 유저 좋아요 누른 노트 리스트 공개 여부 체크
   *
   * @param {request}
   * @param {response}
   * @method GET
   *
   **/
  static checkLikedListPublic = async (req, res) => {
    const userId = req.query.userId;
    try {
      const data = await userModel.getLikedListPublic(userId);
      res.send(data);
    } catch (error) {
      console.error(error);
    }
  };
  /**
   * 유저 좋아요 누른 노트 리스트 공개 여부 변경
   *
   * @param {request}
   * @param {response}
   * @method POST
   *
   **/
  static changeLikedListPublic = async (req, res) => {
    const userId = req.query.userId;
    console.log("I'm in" + userId);
    try {
      const data = await userModel.changeLikedListPublic(userId);
      res.send(data);
    } catch (error) {
      console.error(error);
    }
  };
}

module.exports = UserController;
