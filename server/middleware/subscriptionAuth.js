const express = require("express");
const pool = require("../database/conn");

const SubtableName = "sublist";
const UsertableName = "customer";
const ServerSubtableName = "serverSublist";

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
    const existUserQuery = `SELECT COUNT(*) as existUsers FROM ${UsertableName} WHERE username=?`;
    const existUserQueryResult = await pool.query(
      existUserQuery,
      req.body.username
    );
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

module.exports = {
  checkDuplicateSubscription,
  checkAllFieldsServerSub,
  verifyCustomer,
  checkAllFieldsCustomer,
};
