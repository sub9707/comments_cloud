const db = require("../config/db");

class ErrorsModel {
  static async getAllBoards(offset) {
    return new Promise((resolve) => {
      // Fetch total count
      db.query(
        "SELECT COUNT(*) as totalCount FROM error_contents WHERE publicCheck = 1",
        (countError, countResult) => {
          if (countError) {
            resolve(countError);
            return;
          }

          const totalCount = countResult[0].totalCount;

          // Fetch data
          db.query(
            "SELECT * FROM error_contents WHERE publicCheck = 1 ORDER BY write_date DESC, id ASC LIMIT 6 OFFSET ?",
            [+offset],
            (error, result) => {
              if (!error) {
                // Resolve with both data and total count
                resolve({ data: result, totalCount });
              } else {
                resolve(error);
              }
            }
          );
        }
      );
    });
  }
}
module.exports = ErrorsModel;
