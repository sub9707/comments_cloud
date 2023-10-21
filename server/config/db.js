const mysql = require("mysql");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "nodecrud",
});

db.getConnection(() => {
  console.log("connected to db successfully..!");
});

module.exports = db;
