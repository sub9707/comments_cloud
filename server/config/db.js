const mysql = require("mysql");
require("dotenv").config();

const db = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

db.getConnection(() => {
  console.log("connected to db successfully..!");
});

module.exports = db;
