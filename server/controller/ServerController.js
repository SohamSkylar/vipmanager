const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ENV = require("../config.js");
const mysqlPool = require("../database/mysqlConnection");

const tableName = "serverlist";

const showAllServers = async (req, res) => {
  mysqlPool.getConnection((err, connection) => {
    if (err) return res.send(err.message);
    else if (connection) {
      const sqlQuery = `SELECT * FROM ${tableName}`;
      connection.query(sqlQuery, (err, result) => {
        if (err) return res.send({ msg: err.message });
        else if (result) {
          return res.json(result);
        }
      });
    }
    connection.release();
  });
};

const addNewServer = async (req, res) => {
  mysqlPool.getConnection((err, connection) => {
    if (err) return res.send({ msg: err.message });
    else if (connection) {
      console.log("add new server api activated");
      let name = req.body.name;
      let ip = req.body.ip;
      let port = req.body.port;
      let rcon = req.body.rcon;

      if (rcon) {
        const sqlQuery = `INSERT INTO ${tableName} (name, ip, port, rcon) VALUES(?,?,?,?)`;
        connection.query(sqlQuery, [name, ip, port, rcon], (err, result) => {
          if (err) return res.send({ msg: err.message });
          else if (result) {
            return res.status(201).send({
              msg: "success",
              serverid: Number(result.insertId.toString()),
            });
          }
        });
      }
    }
    connection.release();
  });
};

module.exports = { showAllServers, addNewServer };
