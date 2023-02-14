const pool = require("../database/conn");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ENV = require("../config.js");

const tableName = "serverlist";

const showAllServers = async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const sqlQuery = `SELECT * FROM ${tableName}`;
    const result = await conn.query(sqlQuery);
    res.json(result);
  } catch (err) {
    res.send(err.message);
  } finally {
    if (conn) return conn.release();
  }
};

const addNewServer = async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    console.log("register user api activated");
    let name = req.body.name;
    let ip = req.body.ip;
    let port = req.body.port;
    let rcon = req.body.rcon;

    if (rcon) {
      const sqlQuery = `INSERT INTO ${tableName} (name, ip, port, rcon) VALUES(?,?,?,?)`;
      const result = await pool.query(sqlQuery, [name, ip, port, rcon]);
      console.log(result);
      res.status(201).send({ msg: "success", serverid: Number(result.insertId.toString()) });
    }
  } catch (err) {
    res.send(err.message);
  } finally {
    if (conn) return conn.release();
  }
};

module.exports = { showAllServers, addNewServer };
