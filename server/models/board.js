const { getStartAndEndOfMonth, dateOffset } = require("../config/Calculation");
const moment = require("moment");
const db = require("../config/db");

class ErrorsModel {
  static async getAllBoards(offset, filter) {
    return new Promise((resolve) => {
      let baseQuery =
        "SELECT error_contents.*, users.nickname FROM error_contents LEFT JOIN users ON error_contents.writer_id = users.id WHERE error_contents.publicCheck = 1";
      let orderByClause =
        "ORDER BY error_contents.write_date DESC, error_contents.id ASC";

      if (filter === "popular") {
        orderByClause =
          "ORDER BY error_contents.likes DESC, error_contents.write_date DESC, error_contents.id ASC";
      } else if (filter === "view") {
        orderByClause =
          "ORDER BY error_contents.views DESC, error_contents.write_date DESC, error_contents.id ASC";
      }

      // 총 개수
      db.query(
        `SELECT COUNT(*) as totalCount FROM (${baseQuery}) as filteredData`,
        (countError, countResult) => {
          if (countError) {
            resolve(countError);
            return;
          }
          const totalCount = countResult[0].totalCount;

          db.query(
            `${baseQuery} ${orderByClause} LIMIT 6 OFFSET ?`,
            [+offset],
            (error, result) => {
              if (!error) {
                resolve({ data: result, totalCount });
              } else {
                resolve(error);
                console.error(error);
              }
            }
          );
        }
      );
    });
  }

  static async getEntireBoards() {
    return new Promise((resolve) => {
      const query = `
        SELECT * from error_contents ORDER BY write_date DESC;
      `;
      db.query(query, [], (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          resolve(error);
        }
      });
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
      const startOfWeek = moment().startOf("week").toDate();
      const endOfWeek = moment().endOf("week").toDate();
      console.log("SWEEK: " + startOfWeek);
      console.log("EWEEK: " + endOfWeek);
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
          console.log("결과: " + result);
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
