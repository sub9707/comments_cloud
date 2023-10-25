const db = require("../config/db");

class UserModel {
  static async getusers() {
    return new Promise((resolve) => {
      db.query("select * from users", [], (error, result) => {
        if (!error) resolve(result);
      });
    });
  }
  static async getUserInfo(email) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT name, email FROM users WHERE email = ?",
        [email],
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            if (result.length > 0) {
              resolve(result[0]);
            } else {
              resolve(null);
            }
          }
        }
      );
    });
  }
  static async registerUser(name, email, password, registerDate) {
    return new Promise((resolve) => {
      db.query(
        "insert into users (name, email, password, registerDate) values(?,?,?,?)",
        [name, email, password, registerDate],
        (error, result) => {
          if (!error) {
            resolve(true);
          } else resolve(false);
        }
      );
    });
  }

  static async deleteUser(id) {
    return new Promise((resolve) => {
      db.query("delete from users where id=?", [id], (error, result) => {
        if (!error) resolve(true);
        else resolve(false);
      });
    });
  }
  static async updateUser(id, name, email, password) {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE users SET name=?, email=?, password=? WHERE id=?",
        [name, email, password, id],
        (error, result) => {
          if (!error) {
            if (result.affectedRows > 0) {
              resolve(true);
            } else {
              resolve(false);
            }
          } else {
            reject(error);
          }
        }
      );
    });
  }
  static async authenticateUser(email, password) {
    return new Promise((resolve) => {
      db.query(
        "SELECT * FROM users WHERE email = ? AND password = ?",
        [email, password],
        (error, result) => {
          if (!error && result.length > 0) {
            resolve(result[0]);
          } else {
            resolve(null);
          }
        }
      );
    });
  }
}

module.exports = UserModel;
