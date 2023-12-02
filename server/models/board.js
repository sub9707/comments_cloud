const db = require("../config/db");

class ErrorsModel {
  static async getAllBoards(offset) {
    return new Promise((resolve) => {
      db.query(
        "SELECT *FROM error_contents ORDER BY write_date DESC LIMIT 6 OFFSET ?",
        [+offset],
        (error, result) => {
          if (!error) resolve(result);
          else resolve(error);
        }
      );
    });
  }
}
module.exports = ErrorsModel;
