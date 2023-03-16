const mysql = require("mysql2");
const dotenv = require("dotenv").config({ path: "./server/.env" });

const mysqlPool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASS,
  database: process.env.DB_HOST,
  waitForConnections: true,
  connectionLimit: 20,
  queueLimit: 0,
});

module.exports = mysqlPool;