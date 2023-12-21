const db = require("../config/db");

class NoticeModel {
  static async getNotices() {
    return new Promise((resolve) => {
      db.query("select * from notice", [], (error, result) => {
        if (!error) resolve(result);
      });
    });
  }
  static async writeNotice(title, content, createDate, file) {
    console.log("파일 체크: " + file);
    return new Promise((resolve) => {
      db.query(
        "INSERT INTO notice (title, content, createDate, img_url) VALUES (?, ?, ?, ?)",
        [title, content, createDate, file || null],
        (error, result) => {
          if (!error) {
            resolve(result);
          } else {
            console.error(error);
            resolve(error);
          }
        }
      );
    });
  }
  static async deleteNotice(id) {
    return new Promise((resolve) => {
      db.query("DELETE FROM notice WHERE id = ?", [id], (error, result) => {
        if (!error) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }
}
module.exports = NoticeModel;
