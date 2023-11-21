const db = require("../config/db");

class ErrorsModel {
  static async getAllErrors() {
    return new Promise((resolve) => {
      db.query("select * from error_contents", [], (error, result) => {
        if (!error) resolve(result);
      });
    });
  }
  static async getUserErrors(
    userId,
    offset,
    publicOnly,
    solvedOnly,
    privateOnly,
    unsolvedOnly
  ) {
    console.log(privateOnly);
    return new Promise((resolve) => {
      let query = "SELECT * FROM error_contents WHERE writer_id = ?";

      if (publicOnly) {
        query += " AND publicCheck = 1";
      }
      if (privateOnly) {
        query += " AND publicCheck = 0";
      }

      if (solvedOnly) {
        query += " AND error_solved = 1";
      }
      if (unsolvedOnly) {
        query += " AND error_solved = 0";
      }

      query += " LIMIT 12 OFFSET ?";
      console.log(query);
      db.query(query, [userId, offset], (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          console.error("에러 발생:", error);
          resolve(false);
        }
      });
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
  static async getRepliesCount(id) {
    return new Promise((resolve) => {
      db.query(
        "SELECT COUNT(*) AS count FROM error_content_comments WHERE content_id = ?",
        [id],
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
  static async getErrorReplies(boardId, offset) {
    return new Promise((resolve) => {
      db.query(
        "SELECT ecc.id, ecc.content, ecc.write_date, ecc.writer_id, ecc.likes, ecc.content_id, u.email, u.profileImg, u.nickname FROM error_content_comments ecc JOIN users u ON ecc.writer_id = u.id WHERE ecc.content_id = ? ORDER BY ecc.likes DESC, ecc.write_date DESC LIMIT 5 OFFSET ?",
        [boardId, parseInt(offset, 10)],
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
  static async writeReply(content, writer_id, content_id, write_date) {
    return new Promise((resolve) => {
      db.query(
        "insert into error_content_comments (content, write_date, writer_id, content_id) values(?,?,?,?)",
        [content, write_date, writer_id, content_id],
        (error, result) => {
          if (!error) {
            resolve(result);
          } else {
            console.error("에러 발생:", error);
            resolve(false);
          }
        }
      );
    });
  }
  static async deleteReply(id) {
    return new Promise((resolve) => {
      db.query(
        "DELETE FROM error_content_comments WHERE id = ?",
        [id],
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
  static async updateReply(id, content) {
    return new Promise((resolve) => {
      db.query(
        "UPDATE error_content_comments SET content = ? WHERE id = ?",
        [content, id],
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
  static async getCommentsCount(id) {
    return new Promise((resolve) => {
      db.query(
        "SELECT COUNT(*) AS count FROM error_comments_replies WHERE comment_id = ?",
        [id],
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
  static async getComments(id) {
    return new Promise((resolve) => {
      db.query(
        "SELECT error_comments_replies.*, users.nickname " +
          "FROM error_comments_replies " +
          "JOIN users ON error_comments_replies.writer_id = users.id " +
          "WHERE error_comments_replies.comment_id = ?",
        [id],
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
  static async writeComment(content, replyId, writerId, write_date) {
    return new Promise((resolve) => {
      db.query(
        "insert into error_comments_replies (content, comment_id, writer_id, write_date) values(?,?,?,?)",
        [content, replyId, writerId, write_date],
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
  static async updateComment(replyId, content) {
    return new Promise((resolve) => {
      db.query(
        "UPDATE error_comments_replies SET content = ? WHERE id = ?",
        [content, replyId],
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
  static async deleteComment(id) {
    return new Promise((resolve) => {
      db.query(
        "DELETE FROM error_comments_replies WHERE id = ?",
        [id],
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
  static async deleteCommentsAll(id) {
    return new Promise((resolve) => {
      db.query(
        "DELETE FROM error_content_comments WHERE content_id = ?",
        [id],
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
  static async checkUserReplyLiked(replyId, userId) {
    return new Promise((resolve) => {
      db.query(
        "SELECT COUNT(*) AS count_likes FROM error_reply_likes WHERE reply_id = ? AND user_id = ?",
        [replyId, userId],
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
  static async postReplyLike(replyId) {
    return new Promise((resolve) => {
      db.query(
        "UPDATE error_content_comments SET likes = likes + 1 WHERE id = ?",
        [replyId],
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
  static async postReplyLikeUser(replyId, userId) {
    return new Promise((resolve) => {
      db.query(
        "INSERT INTO error_reply_likes (reply_id, user_id) VALUES (?, ?)",
        [replyId, userId],
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
  static async postReplyCancelLike(replyId) {
    return new Promise((resolve) => {
      db.query(
        "UPDATE error_content_comments SET likes = likes - 1 WHERE id = ?",
        [replyId],
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
  static async postReplyCancelLikeUser(userId) {
    return new Promise((resolve) => {
      db.query(
        "DELETE FROM error_reply_likes WHERE user_id = ?",
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
}
module.exports = ErrorsModel;
