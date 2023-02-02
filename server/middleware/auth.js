const express = require("express");
const jwt = require("jsonwebtoken");
const ENV = require("../config.js");
const otpGenerator = require("otp-generator");
const pool = require("../database/conn");

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = await jwt.verify(token, ENV.JWT_SECRET);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ error: "Authentication Failed..." });
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
    const existUserQuery = `SELECT COUNT(*) as existUsers FROM user WHERE username=?`;
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

module.exports = {
  auth,
  localVariables,
  verifyUser,
};
