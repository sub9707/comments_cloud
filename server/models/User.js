const db = require("../config/db");
const bcrypt = require("bcrypt");

class UserModel {
  static async getusers() {
    return new Promise((resolve) => {
      db.query("select * from users", [], (error, result) => {
        if (!error) resolve(result);
      });
    });
  }
  static async getUserInfoByEmail(email) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT name, email, rule  FROM users WHERE email = ?",
        [email],
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            if (result.length > 0) {
              resolve(result[0]);
            } else {
              resolve(null);
            }
          }
        }
      );
    });
  }
  static async registerUser(name, email, password, registerDate) {
    const [id, domain] = email.split("@");
    const maskedId =
      id.substring(0, Math.ceil(id.length / 2)) +
      "*".repeat(id.length - Math.ceil(id.length / 2));
    const tempNickname = maskedId + "@" + domain;

    return new Promise((resolve) => {
      db.query(
        "insert into users (name, email, password, registerDate, nickname) values(?,?,?,?,?)",
        [name, email, password, registerDate, tempNickname],
        (error, result) => {
          if (!error) {
            resolve(result);
          } else console.log(error);
        }
      );
    });
  }

  static async deleteUser(id) {
    return new Promise((resolve) => {
      db.query("delete from users where id=?", [id], (error, result) => {
        if (!error) resolve(result);
        else resolve(error);
      });
    });
  }
  static async updateUser(
    name,
    nickname,
    homepage,
    profile_message,
    newProfileImg,
    newDate,
    userId
  ) {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE users SET name=?,nickname=?, homepage=?,profile_message=?, profileImg=?, nickname_change_date=? WHERE id=?",
        [
          name,
          nickname,
          homepage,
          profile_message,
          newProfileImg,
          newDate,
          userId,
        ],
        (error, result) => {
          if (!error) {
            resolve(result);
          } else {
            reject(error);
          }
        }
      );
    });
  }
  static async authenticateUser(email, password) {
    return new Promise((resolve) => {
      db.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
        async (error, result) => {
          if (!error && result.length > 0) {
            const user = result[0];
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (passwordMatch) {
              resolve(user);
            } else {
              resolve(error);
            }
          } else {
            resolve(error);
          }
        }
      );
    });
  }
  static async getUserInfoById(userId) {
    return new Promise((resolve) => {
      db.query(
        "SELECT id, name, email, registerDate, rule, profileImg, profile_message, nickname, nickname_change_date, homepage FROM users WHERE id = ?",
        [userId],
        (error, result) => {
          if (!error) {
            resolve(result);
          } else {
            resolve(error);
          }
        }
      );
    });
  }
  static async findUserById(userId) {
    return new Promise((resolve) => {
      db.query(
        "SELECT * FROM users WHERE id = ?",
        [userId],
        (error, result) => {
          if (!error) {
            resolve(result);
          } else {
            resolve(error);
          }
        }
      );
    });
  }
}

module.exports = UserModel;
