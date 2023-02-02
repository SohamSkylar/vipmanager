const express = require("express");
const jwt = require("jsonwebtoken");
const ENV = require("../config.js");
const otpGenerator = require('otp-generator');
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

const localVariables = async(req, res, next) =>{
  req.app.locals = {
    OTP: null,
    resetSession: false
  }
  next();
}

const verifyUser = async(req,res, next)=>{
  let conn;
  try {
    conn = await pool.getConnection();
    console.log("db is active");
    const sqlQuery = `SELECT * FROM user WHERE username=?`;
    let result = await pool.query(sqlQuery, req.query.username);
    if (result[0].length === 0) return res.send("Cant Find User...");
    console.log(result)
    next();

  } catch (err) {
    return res.status(404).send({error: "Authentication Error"});
  } finally {
    if (conn) return conn.release();
  }
};

module.exports = {
  auth,
  localVariables,
  verifyUser
};
