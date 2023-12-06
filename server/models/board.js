const {
  getStartAndEndOfMonth,
  getStartAndEndOfWeek,
  dateOffset,
} = require("../config/Calculation");
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
  static async getDailyRank() {
    return new Promise((resolve) => {
      const today = new Date(Date.now() - dateOffset).toISOString();
      const formattedDate = today.split("T")[0];
      const query = `
        SELECT ec.id, ec.title, ec.write_date
        FROM error_contents_likes ecl
        JOIN error_contents ec ON ecl.board_id = ec.id
        WHERE ecl.like_date LIKE CONCAT(?,'%')
        ORDER BY ecl.like_date DESC
        LIMIT 10;
      `;
      db.query(query, [formattedDate], (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          resolve(error);
        }
      });
    });
  }
  static async getWeeklyRank() {
    return new Promise((resolve) => {
      const { startOfWeek, endOfWeek } = getStartAndEndOfWeek();
      const query = `
        SELECT ec.id, ec.title, ec.write_date
        FROM error_contents_likes ecl
        JOIN error_contents ec ON ecl.board_id = ec.id
        WHERE ecl.like_date BETWEEN ? AND ?
        GROUP BY ecl.board_id
        ORDER BY COUNT(*) DESC, MAX(ecl.like_date) DESC
        LIMIT 10;
      `;

      db.query(query, [startOfWeek, endOfWeek], (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          resolve(error);
        }
      });
    });
  }

  static async getMonthlyRank() {
    return new Promise((resolve) => {
      const { startOfMonth, endOfMonth } = getStartAndEndOfMonth();

      const query = `
        SELECT ec.id, ec.title, ec.write_date
        FROM error_contents_likes ecl
        JOIN error_contents ec ON ecl.board_id = ec.id
        WHERE ecl.like_date BETWEEN ? AND ?
        GROUP BY ecl.board_id
        ORDER BY COUNT(*) DESC, MAX(ecl.like_date) DESC
        LIMIT 10;
      `;

      db.query(query, [startOfMonth, endOfMonth], (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          resolve(error);
        }
      });
    });
  }
  static async getSearchBoard(search, offset) {
    return new Promise((resolve) => {
      const dataQuery = `
        SELECT *
        FROM error_contents
        WHERE title LIKE ? OR title = ?
        LIMIT 6 OFFSET ?;
      `;

      const countQuery = `
        SELECT COUNT(*) as total
        FROM error_contents
        WHERE title LIKE ? OR title = ?;
      `;

      db.query(
        dataQuery,
        [`%${search}%`, search, parseInt(offset, 10)],
        (error, result) => {
          if (error) {
            resolve(error);
            return;
          }
          // 쿼리문 입력
          db.query(
            countQuery,
            [`%${search}%`, search],
            (countError, countResult) => {
              if (countError) {
                resolve(countError);
                return;
              }
              // response data
              const responseData = {
                data: result,
                count: countResult[0].total,
              };
              resolve(responseData);
            }
          );
        }
      );
    });
  }
}
module.exports = ErrorsModel;
