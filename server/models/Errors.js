const db = require("../config/db");

class ErrorsModel {
  static async getAllErrors() {
    return new Promise((resolve) => {
      db.query("select * from error_contents", [], (error, result) => {
        if (!error) resolve(result);
      });
    });
  }
  static async getUserErrors(userId, offset) {
    return new Promise((resolve) => {
      db.query(
        "select * from error_contents WHERE writer_id = ? LIMIT 12 OFFSET ?",
        [userId, offset],
        (error, result) => {
          if (!error) {
            resolve(result);
          } else {
            console.error("에러 발생:", error); // 에러 메시지를 출력
            resolve(false);
          }
        }
      );
    });
  }
  static async getUserErrorsCount(userId) {
    return new Promise((resolve) => {
      db.query(
        "SELECT COUNT(*) AS errorsTotal FROM error_contents WHERE writer_id = ?",
        [userId],
        (error, result) => {
          if (!error) {
            resolve(result);
          } else {
            console.error("에러 발생:", error);
            resolve(0);
          }
        }
      );
    });
  }
  static async writeError(
    title,
    tags,
    error_state,
    error_cause,
    error_process,
    error_solved,
    error_result,
    write_date,
    writer_id,
    publicCheck
  ) {
    return new Promise((resolve) => {
      db.query(
        "insert into error_contents (title,tags, error_state,error_cause,error_process,error_solved,error_result,write_date,writer_id,publicCheck) values(?,?,?,?,?,?,?,?,?,?)",
        [
          title,
          JSON.stringify(tags),
          error_state,
          error_cause,
          error_process,
          error_solved,
          error_result,
          write_date,
          writer_id,
          publicCheck,
        ],
        (error, result) => {
          if (!error) {
            resolve(result);
          } else {
            console.error("에러 발생:", error); // 에러 메시지를 출력
            resolve(false);
          }
        }
      );
    });
  }
  static async deleteError(id) {
    return new Promise((resolve) => {
      db.query(
        "DELETE FROM error_contents WHERE id = ?",
        [id],
        (error, result) => {
          if (!error) {
            resolve(true);
          } else {
            resolve(false);
          }
        }
      );
    });
  }
  static async getErrorReplies(boardId) {
    return new Promise((resolve) => {
      db.query(
        "SELECT ecc.id, ecc.content, ecc.write_date, ecc.writer_id, ecc.likes, ecc.content_id, u.email, u.profileImg FROM error_content_comments ecc JOIN users u ON ecc.writer_id = u.id WHERE ecc.content_id = ?",
        [boardId],
        (error, result) => {
          if (!error) {
            resolve(result);
          } else {
            resolve(result);
          }
        }
      );
    });
  }
  static async writeReply(content, writer_id, content_id, write_date) {
    return new Promise((resolve) => {
      db.query(
        "insert into error_content_comments (content, write_date, writer_id, content_id) values(?,?,?,?)",
        [content, write_date, writer_id, content_id],
        (error, result) => {
          if (!error) {
            resolve(result);
          } else {
            console.error("에러 발생:", error); // 에러 메시지를 출력
            resolve(false);
          }
        }
      );
    });
  }
}
module.exports = ErrorsModel;
