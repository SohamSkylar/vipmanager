const express = require("express");
const pool = require("../database/conn");

const tableName = "serverlist";

const checkDuplicateServer = async (req, res, next) => {
  let conn;
  try {
    let ip = req.body.ip;
    let port = req.body.port;
    let duplicateServer = false;
    new Promise(async (resolve, reject) => {
      const existServerQuery = `SELECT COUNT(*) as existServers FROM ${tableName} WHERE ip=? AND port=?`;
      const existServerQueryResult = await pool.query(existServerQuery, [ip, port]);
      const existServerVal = Number(
        existServerQueryResult[0].existServers.toString()
      );
      if (existServerVal > 0) duplicateServer = true;

      if (duplicateServer)
        reject(new Error("DUPLICATE_SERVER"));
      resolve();
    })
      .then(() => {
        next();
      })
      .catch((err) => {
        if (err.message === "DUPLICATE_SERVER")
          res.status(201).send({msg: "fail", detail: "DUPLICATE_SERVER"});
        else res.status(500).send(err.message);
      });
  } catch (error) {
    res.status(500).send({ error: error.message });
  } finally {
    if (conn) return conn.release();
  }
};

module.exports = checkDuplicateServer;
