const mysql = require("mysql");
require("dotenv").config();

const db = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: 32277,
});

db.getConnection((err) => {
  console.log("connected to db successfully..! running on" + host + ":" + port);
  if (err) console.error(err);
});

module.exports = db;
