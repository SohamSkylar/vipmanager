const express = require("express");
const pool = require("../database/conn");
const jwt = require("jsonwebtoken");
const ENV = require("../config.js");

const SubtableName = "sublist";
const ServertableName = "serverlist";
const UsertableName = "user";

const authCustomer = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = await jwt.verify(token, ENV.JWT_SECRET);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(202).send({ msg: "INVALID_CUSTOMER", err: error.message });
  }
};

const checkDuplicateSubscription = async (req, res, next) => {
  let conn;
  try {
    let subtype = req.body.subtype;
    let duplicateSub = false;
    new Promise(async (resolve, reject) => {
      const existSubQuery = `SELECT COUNT(*) as existSubs FROM ${SubtableName} WHERE subtype=?`;
      const existSubQueryResult = await pool.query(existSubQuery, [subtype]);
      const existSubVal = Number(existSubQueryResult[0].existSubs.toString());
      if (existSubVal > 0) duplicateSub = true;

      if (duplicateSub) reject(new Error("DUPLICATE_SUB"));
      resolve();
    })
      .then(() => {
        next();
      })
      .catch((err) => {
        if (err.message === "DUPLICATE_SUB")
          res.status(201).send({ msg: "fail", detail: "DUPLICATE_SUB" });
        else res.status(500).send(err.message);
      });
  } catch (error) {
    res.status(500).send({ error: error.message });
  } finally {
    if (conn) return conn.release();
  }
};

const checkAllFieldsServerSub = async (req, res, next) => {
  let conn;
  try {
    let subtype = req.body.subtype;
    let name = req.body.name;
    let EmptySub = false;
    new Promise(async (resolve, reject) => {
      if (subtype === "" || name === "") EmptySub = true;

      if (EmptySub) reject(new Error("EMPTY_SUB"));
      resolve();
    })
      .then(() => {
        next();
      })
      .catch((err) => {
        if (err.message === "EMPTY_SUB")
          res.status(201).send({ msg: "fail", detail: "EMPTY_SUB" });
        else res.status(500).send(err.message);
      });
  } catch (error) {
    res.status(500).send({ error: error.message });
  } finally {
    if (conn) return conn.release();
  }
};

const checkAllFieldsCustomer = async (req, res, next) => {
  let conn;
  try {
    let subtype = req.body.subtype;
    let severname = req.body.severname;
    let EmptySub = false;
    new Promise(async (resolve, reject) => {
      if (subtype === "" || severname === "") EmptySub = true;

      if (EmptySub) reject(new Error("EMPTY_SUB"));
      resolve();
    })
      .then(() => {
        next();
      })
      .catch((err) => {
        if (err.message === "EMPTY_SUB")
          res.status(201).send({ msg: "fail", detail: "EMPTY_SUB" });
        else res.status(500).send(err.message);
      });
  } catch (error) {
    res.status(500).send({ error: error.message });
  } finally {
    if (conn) return conn.release();
  }
};

const verifyCustomer = async (req, res, next) => {
  let conn;

  try {
    conn = await pool.getConnection();
    console.log("db is active");
    const existUserQuery = `SELECT COUNT(*) as existUsers FROM ${UsertableName} WHERE id=?`;
    const existUserQueryResult = await pool.query(
      existUserQuery,
      req.body.userid
    );
    console.log(existUserQueryResult)
    const existUserVal = Number(existUserQueryResult[0].existUsers.toString());
    if (existUserVal === 1) next();
    else if (existUserVal === 0) throw new Error("NO_USER_AVAILABLE");
    else throw new Error("MULTIPLE_USER_AVAILABLE");
  } catch (err) {
    return res.status(201).send({ msg: err.message });
  } finally {
    if (conn) return conn.release();
  }
};

const getAllCustomerTables = async (req, res, next) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const sqlQuery = `SELECT name FROM ${ServertableName}`;
    const result = await conn.query(sqlQuery);
    const userRows = JSON.parse(JSON.stringify(result));
    // console.log(userRows[0].name);
    let tableList = [];
    for(let i = 0; i<userRows.length; i++){
      tableList[i] = userRows[i].name
    }
    // console.log(tableList)
    req.tableName = tableList;
    next();
  } catch (err) {
    res.send(err.message);
  } finally {
    if (conn) return conn.release();
  }
};

module.exports = {
  checkDuplicateSubscription,
  checkAllFieldsServerSub,
  verifyCustomer,
  checkAllFieldsCustomer,
  authCustomer,
  getAllCustomerTables,
};
