const db = require("../config/db");

class NoticeModel {
  static async getNotices() {
    return new Promise((resolve) => {
      db.query("select * from notice", [], (error, result) => {
        if (!error) resolve(result);
      });
    });
  }
  static async writeNotice(title, content, createDate, imgUrls) {
    return new Promise((resolve) => {
      db.query(
        "insert into notice (title, content, createDate, img_url) values(?,?,?,?)",
        [title, content, createDate, imgUrls],
        (error, result) => {
          if (!error) {
            resolve(true);
          } else resolve(false);
        }
      );
    });
  }
}
module.exports = NoticeModel;
