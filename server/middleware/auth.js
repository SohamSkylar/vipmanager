const express = require("express");
const jwt = require("jsonwebtoken");
const ENV = require("../config.js");
const otpGenerator = require("otp-generator");
const pool = require("../database/conn");
var SteamCommunity = require("steamcommunity");

const tableName = "user";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = await jwt.verify(token, ENV.JWT_SECRET);
    req.user = decodedToken;
    req.type = decodedToken.usertype;
    console.log(decodedToken);
    next();
  } catch (error) {
    res.status(202).send("Please login");
  }
};

const localVariables = async (req, res, next) => {
  req.app.locals = {
    OTP: null,
    resetSession: false,
  };
  next();
};

const verifyUser = async (req, res, next) => {
  let conn;

  try {
    conn = await pool.getConnection();
    console.log("db is active");
    const existUserQuery = `SELECT COUNT(*) as existUsers FROM ${tableName} WHERE username=?`;
    const existUserQueryResult = await pool.query(
      existUserQuery,
      req.query.username
    );
    const existUserVal = Number(existUserQueryResult[0].existUsers.toString());
    if (existUserVal === 1) next();
    else if (existUserVal === 0) throw new Error("NO_USER_AVAILABLE");
    else throw new Error("MULTIPLE_USER_AVAILABLE");
  } catch (err) {
    return res.status(404).send({ error: err.message });
  } finally {
    if (conn) return conn.release();
  }
};

const checkDuplicateUser = async (req, res, next) => {
  let conn;
  try {
    let email = req.body.email;
    let username = req.body.username;
    let duplicateUsername = false,
      duplicateEmail = false;
    new Promise(async (resolve, reject) => {
      const existUserQuery = `SELECT COUNT(*) as existUsers FROM ${tableName} WHERE username=?`;
      const existUserQueryResult = await pool.query(existUserQuery, username);
      const existUserVal = Number(
        existUserQueryResult[0].existUsers.toString()
      );
      if (existUserVal > 0) duplicateUsername = true;

      const existEmailQuery = `SELECT COUNT(*) as existEmail FROM ${tableName} WHERE email=?`;
      const existEmailQueryResult = await pool.query(existEmailQuery, email);
      const existEmailVal = Number(
        existEmailQueryResult[0].existEmail.toString()
      );
      if (existEmailVal > 0) duplicateEmail = true;
      if (duplicateEmail && duplicateUsername)
        reject(new Error("DUPLICATE_EMAIL_AND_USERNAME"));
      else if (duplicateEmail) reject(new Error("DUPLICATE_EMAIL"));
      else if (duplicateUsername) reject(new Error("DUPLICATE_USERNAME"));
      resolve();
    })
      .then(() => {
        next();
      })
      .catch((err) => {
        if (err.message === "DUPLICATE_EMAIL_AND_USERNAME")
          res.status(411).send("Email and username exists");
        else if (err.message === "DUPLICATE_EMAIL")
          res.status(410).send("duplicate email exists");
        else if (err.message === "DUPLICATE_USERNAME")
          res.status(409).send("duplicate username exists");
        else res.status(500).send("unknown error");
      });
  } catch (error) {
    res.status(404).send({ error: error.message });
  } finally {
    if (conn) return conn.release();
  }
};

const checkDuplicateAdmin = async (req, res, next) => {
  let conn;
  try {
    let email = req.body.email;
    let username = req.body.username;
    let duplicateUsername = false,
      duplicateEmail = false;
    new Promise(async (resolve, reject) => {
      const existUserQuery = `SELECT COUNT(*) as existUsers FROM admin WHERE username=?`;
      const existUserQueryResult = await pool.query(existUserQuery, username);
      const existUserVal = Number(
        existUserQueryResult[0].existUsers.toString()
      );
      if (existUserVal > 0) duplicateUsername = true;

      const existEmailQuery = `SELECT COUNT(*) as existEmail FROM admin WHERE email=?`;
      const existEmailQueryResult = await pool.query(existEmailQuery, email);
      const existEmailVal = Number(
        existEmailQueryResult[0].existEmail.toString()
      );
      if (existEmailVal > 0) duplicateEmail = true;
      if (duplicateEmail && duplicateUsername)
        reject(new Error("DUPLICATE_EMAIL_AND_USERNAME"));
      else if (duplicateEmail) reject(new Error("DUPLICATE_EMAIL"));
      else if (duplicateUsername) reject(new Error("DUPLICATE_USERNAME"));
      resolve();
    })
      .then(() => {
        next();
      })
      .catch((err) => {
        if (err.message === "DUPLICATE_EMAIL_AND_USERNAME")
          res.status(411).send("Email and username exists");
        else if (err.message === "DUPLICATE_EMAIL")
          res.status(410).send("duplicate email exists");
        else if (err.message === "DUPLICATE_USERNAME")
          res.status(409).send("duplicate username exists");
        else res.status(500).send("unknown error");
      });
  } catch (error) {
    res.status(404).send({ error: error.message });
  } finally {
    if (conn) return conn.release();
  }
};

module.exports = {
  auth,
  localVariables,
  verifyUser,
  checkDuplicateUser,
  checkDuplicateAdmin,
};
