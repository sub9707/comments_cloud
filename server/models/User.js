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
        "SELECT name, email, rule, profileImg  FROM users WHERE email = ?",
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

  static async deleteUser(userId) {
    return new Promise((resolve) => {
      db.query("delete from users where id=?", [userId], (error, result) => {
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
  static async authenticateUser(email, password, currentTime) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
        async (error, result) => {
          if (!error && result.length > 0) {
            const user = result[0];
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (passwordMatch) {
              db.query(
                "UPDATE users SET last_login = ? WHERE email = ?",
                [currentTime, email],
                (updateError, updateResult) => {
                  if (!updateError) {
                    resolve(user);
                  } else {
                    reject(updateError);
                  }
                }
              );
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
  static async checkPassword(userId, password) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM users WHERE id = ?",
        [userId],
        async (error, result) => {
          if (!error) {
            if (result.length === 0) {
              resolve(false);
            } else {
              const hashedPassword = result[0].password;
              try {
                const passwordMatch = await bcrypt.compare(
                  password,
                  hashedPassword
                );
                resolve(passwordMatch);
              } catch (compareError) {
                reject(compareError);
              }
            }
          } else {
            reject(error);
          }
        }
      );
    });
  }

  static async getUserInfoById(userId) {
    return new Promise((resolve) => {
      db.query(
        "SELECT id, name, email, registerDate, rule, profileImg, profile_message, nickname, nickname_change_date, homepage, last_login FROM users WHERE id = ?",
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
  static async getTotalNoteCount(userId) {
    return new Promise((resolve) => {
      db.query(
        "SELECT COUNT(*) as count FROM error_contents WHERE writer_id = ?",
        [userId],
        (error, result) => {
          if (!error) {
            resolve(result[0]);
          } else {
            resolve(error);
          }
        }
      );
    });
  }
  static async getTotalSolvedCount(userId) {
    return new Promise((resolve) => {
      db.query(
        "SELECT COUNT(*) as count FROM error_contents WHERE writer_id = ? AND error_solved = 1",
        [userId],
        (error, result) => {
          if (!error) {
            resolve(result[0]);
          } else {
            resolve(error);
          }
        }
      );
    });
  }
  static async getTotalLikedCount(userId) {
    return new Promise((resolve) => {
      db.query(
        "SELECT SUM(likes) as likes FROM error_contents WHERE writer_id = ?",
        [userId],
        (error, result) => {
          if (!error) {
            resolve(result[0]);
          } else {
            resolve(error);
          }
        }
      );
    });
  }
  static async getCalendarData(userId) {
    return new Promise((resolve) => {
      // NOTE: date: 날짜, value: count 합으로 작성
      db.query(
        "SELECT DATE_FORMAT(STR_TO_DATE(write_date, '%Y.%m.%d'), '%Y-%m-%d') AS day, COUNT(*) AS value FROM error_contents WHERE writer_id = ? GROUP BY DATE_FORMAT(STR_TO_DATE(write_date, '%Y.%m.%d'), '%Y-%m-%d') ORDER BY DATE_FORMAT(STR_TO_DATE(write_date, '%Y.%m.%d'), '%Y-%m-%d')",
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
  static async getRecentNotes(userId) {
    return new Promise((resolve) => {
      db.query(
        "SELECT * FROM error_contents WHERE writer_id = ? AND publicCheck = 1 ORDER BY write_date DESC LIMIT 5",
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
  static async getLikedNotes(userId) {
    return new Promise((resolve) => {
      db.query(
        "SELECT * FROM error_contents WHERE writer_id = ? AND publicCheck = 1 ORDER BY likes DESC, write_date DESC LIMIT 5",
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
  static async getLikedNoteList(userId, offset) {
    const query = `
    SELECT ec.id, ec.title,ec.writer_id, u.nickname, ecl.like_date
    FROM error_contents_likes ecl
    JOIN error_contents ec ON ecl.board_id = ec.id
    JOIN users u ON ec.writer_id = u.id
    WHERE ecl.user_id = ?
    ORDER BY ecl.like_date DESC
    LIMIT 10 OFFSET ?
  `;
    return new Promise((resolve) => {
      db.query(query, [userId, offset], (error, result) => {
        if (!error) {
          const responseData = {
            data: result,
            totalCount: result.length > 0 ? result.length : 0,
          };
          resolve(responseData);
        } else {
          resolve(error);
        }
      });
    });
  }
  static async getLikedListPublic(userId) {
    const query = `
      SELECT liked_list_public FROM users WHERE id = ?
    `;
    return new Promise((resolve) => {
      db.query(query, [userId], (error, result) => {
        if (!error) {
          resolve(result[0]);
        } else {
          resolve(error);
        }
      });
    });
  }
  static async changeLikedListPublic(userId) {
    const query = `
      UPDATE users
      SET liked_list_public = NOT liked_list_public
      WHERE id = ?;
    `;
    return new Promise((resolve) => {
      db.query(query, [userId], (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          resolve(error);
        }
      });
    });
  }
}

module.exports = UserModel;
