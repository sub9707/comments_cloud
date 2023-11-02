const db = require("../config/db");

class ErrorsModel {
  static async getAllErrors() {
    return new Promise((resolve) => {
      db.query("select * from error_contents", [], (error, result) => {
        if (!error) resolve(result);
      });
    });
  }
  static async writeError(
    title,
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
        "insert into error_contents (title,error_state,error_cause,error_process,error_solved,error_result,write_date,writer_id,publicCheck) values(?,?,?,?,?,?,?,?,?)",
        [
          title,
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
            resolve(true);
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
}
module.exports = ErrorsModel;
