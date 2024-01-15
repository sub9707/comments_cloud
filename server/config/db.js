const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: 32277,
  timezone: "Asia/Seoul",
});

db.getConnection((err) => {
  console.log(
    "connected to db successfully..! running on " + process.env.MYSQL_HOST
  );
  if (err) console.error(err);
});

module.exports = db;
