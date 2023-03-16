const express = require("express");
const mysqlPool = require("../database/mysqlConnection");

const tableName = "serverlist";

const checkDuplicateServer = async (req, res, next) => {
  mysqlPool.getConnection((err, connection) => {
    if (err) return res.send({ msg: err.message });
    else if (connection) {
      let ip = req.body.ip;
      let port = req.body.port;
      let servername = req.body.name;
      const checkIPPortPromise = new Promise(async (resolve, reject) => {
        const existServerQuery = `SELECT COUNT(*) as existServers FROM ${tableName} WHERE ip=? AND port=?`;
        connection.query(existServerQuery, [ip, port], (err, result) => {
          if (err) return reject(new Error(err.message));
          else if (result) {
            const existServerVal = Number(result[0].existServers.toString());
            if (existServerVal > 0)
              return reject(new Error("DUPLICATE_SERVER"));
            resolve();
          }
        });
      });
      const checkServerNamePromise = new Promise(async (resolve, reject) => {
        const existServerQuery = `SELECT COUNT(*) as existServerName FROM ${tableName} WHERE name=?`;
        connection.query(existServerQuery, servername, (err, result) => {
          if (err) return reject(new Error(err.message));
          else if (result) {
            const existServerVal = Number(result[0].existServerName.toString());
            if (existServerVal > 0)
              return reject(new Error("DUPLICATE_SERVERNAME"));
            resolve();
          }
        });
      });
      Promise.all([checkIPPortPromise, checkServerNamePromise])
        .then(() => {
          console.log("exec");
          next();
        })
        .catch((err) => {
          console.log("exec1");
          if (err.message === "DUPLICATE_SERVER")
            return res
              .status(201)
              .send({ msg: "fail", detail: "DUPLICATE_SERVER" });
          else if (err.message === "DUPLICATE_SERVERNAME")
            return res
              .status(201)
              .send({ msg: "fail", detail: "DUPLICATE_SERVERNAME" });
          else return res.status(500).send(err.message);
        });
    }
    connection.release();
  });
};

module.exports = checkDuplicateServer;
