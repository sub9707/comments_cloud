const db = require("../config/db");

class AdminModel {
  static async getUserCount() {
    return new Promise((resolve) => {
      const totalCountQuery = `
            SELECT COUNT(*) AS totalCount
            FROM users;
          `;

      const todayCountQuery = `
            SELECT COUNT(*) AS todayCount
            FROM users
            WHERE DATE(registerDate) = CURDATE();
          `;

      db.query(totalCountQuery, [], (totalCountError, totalCountResult) => {
        if (totalCountError) {
          resolve(totalCountError);
          return;
        }

        db.query(todayCountQuery, [], (todayCountError, todayCountResult) => {
          if (todayCountError) {
            resolve(todayCountError);
            return;
          }

          const totalCount = totalCountResult[0].totalCount;
          const todayCount = todayCountResult[0].todayCount;

          resolve({ totalCount, todayCount });
        });
      });
    });
  }
  static async getLoginCount() {
    return new Promise((resolve) => {
      const query = `
        SELECT COUNT(*) AS loginCount
        FROM users
        WHERE DATE_FORMAT(last_login, '%Y-%m-%d') = CURDATE();
      `;
      db.query(query, [], (error, result) => {
        if (!error) {
          const loginCount = result[0].loginCount;
          resolve({ loginCount: loginCount });
        } else {
          console.error(error);
          resolve(error);
        }
      });
    });
  }
  static async getBoardCount() {
    return new Promise((resolve) => {
      const todayBoardQuery = `
        SELECT COUNT(*) AS todayBoard
        FROM error_contents
        WHERE DATE(write_date) = CURDATE();
      `;

      const totalBoardQuery = `
        SELECT COUNT(*) AS totalBoard
        FROM error_contents;
      `;

      db.query(todayBoardQuery, [], (todayError, todayResult) => {
        if (todayError) {
          resolve(todayError);
          return;
        }

        db.query(totalBoardQuery, [], (totalError, totalResult) => {
          if (totalError) {
            resolve(totalError);
            return;
          }

          const todayBoard = todayResult[0].todayBoard;
          const totalBoard = totalResult[0].totalBoard;

          resolve({ todayBoard, totalBoard });
        });
      });
    });
  }
  static async getRepliesCount() {
    return new Promise((resolve) => {
      // 오늘 작성된 댓글 수 쿼리
      const todayRepliesQuery =
        "SELECT COUNT(*) AS todayReplies FROM error_content_comments WHERE DATE(write_date) = CURDATE()";

      db.query(todayRepliesQuery, [], (errorToday, resultToday) => {
        if (errorToday) {
          resolve(errorToday);
          return;
        }

        // 총 댓글 수 쿼리
        const totalRepliesQuery =
          "SELECT COUNT(*) AS totalReplies FROM error_content_comments";

        db.query(totalRepliesQuery, [], (errorTotal, resultTotal) => {
          if (errorTotal) {
            resolve(errorTotal);
            return;
          }

          // 결과를 객체로 조합하여 반환
          const repliesCount = {
            todayReplies: resultToday[0].todayReplies,
            totalReplies: resultTotal[0].totalReplies,
          };

          resolve(repliesCount);
        });
      });
    });
  }
  static async getUserGraphData() {
    return new Promise((promiseResolve, promiseReject) => {
      const query = `
        SELECT DATE_FORMAT(registerDate, '%Y-%m') AS x, COUNT(*) AS y
        FROM users 
        GROUP BY DATE_FORMAT(registerDate, '%Y-%m') 
        ORDER BY DATE_FORMAT(registerDate, '%Y-%m');
    `;
      db.query(query, [], (error, results) => {
        if (!error) {
          promiseResolve({ data: results });
        } else {
          console.error(error);
          promiseReject(error);
        }
      });
    });
  }
}
module.exports = AdminModel;
