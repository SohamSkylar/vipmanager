const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const ENV = require("../config.js");
const otpGenerator = require("otp-generator");
const mysqlPool = require("../database/mysqlConnection");

const tableName = "user";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = await jwt.verify(token, ENV.JWT_SECRET);
    req.user = decodedToken;
    req.type = decodedToken.usertype;
    next();
  } catch (error) {
    res.status(202).send({ msg: "AUTH_FAILED" });
  }
};

const verifyPassword = async (req, res, next) => {
  mysqlPool.getConnection((err, connection) => {
    if (err) return res.send({ msg: err.message });
    else if (connection) {
      const currentpass = req.body.currentpass;
      const userid = req.user.userid;
      const sqlQuery = `Select * from ${tableName} where id=?`;
      connection.query(sqlQuery, userid, async (err, result) => {
        if (err) return res.send({ msg: err.message });
        else if (result) {
          const row = JSON.parse(JSON.stringify(result));
          const encryptpass = row[0].password;
          await bcrypt.compare(currentpass, encryptpass).then((passwordCheck) => {
              if (!passwordCheck) return res.send({ msg: "Wrong Current Password" });
              next();
            }).catch((err) => {
              return res.send({msg: err.message})
            })
        }
      });
    }
    connection.release();
  });
};

const localVariables = async (req, res, next) => {
  req.app.locals = {
    OTP: null,
    resetSession: false,
  };
  next();
};

const verifyUser = async (req, res, next) => {
  mysqlPool.getConnection((err, connection) => {
    if (err) return res.send({ error: err.message });
    else if (connection) {
      const existUserQuery = `SELECT COUNT(*) as existUsers FROM ${tableName} WHERE username=?`;
      connection.query(existUserQuery, req.query.username, (err, result) => {
        if (err) return res.send({ error: err.message });
        else if (result) {
          const existUserVal = Number(result[0].existUsers.toString());
          if (existUserVal === 1) next();
          else if (existUserVal === 0)
            return res.status(404).send({ error: "NO_USER_AVAILABLE" });
          else
            return res.status(404).send({ error: "MULTIPLE_USER_AVAILABLE" });
        }
      });
    }
    connection.release();
  });
};

const checkDuplicateUser = async (req, res, next) => {
  mysqlPool.getConnection((err, connection) => {
    if (err) return res.status(500).send({ error: err.message });
    else if (connection) {
      let email = req.body.email;
      let username = req.body.username;

      const checkEmailPromise = new Promise(async (resolve, reject) => {
        if (email) {
          const existEmailQuery = `SELECT COUNT(*) as existEmail FROM ${tableName} WHERE email=?`;
          connection.query(existEmailQuery, email, (err, result) => {
            if (err) return res.status(500).send({ error: err.message });
            else if (result) {
              const existEmailVal = Number(result[0].existEmail.toString());
              if (existEmailVal > 0) {
                resolve({ email: "duplicateEmail" });
              } else resolve({ email: "available" });
            }
          });
        } else {
          resolve({ email: "NO_EMAIL_FOUND" });
        }
      });

      const checkUsernamePromise = new Promise(async (resolve, reject) => {
        if (username) {
          const existUserQuery = `SELECT COUNT(*) as existUsers FROM ${tableName} WHERE username=?`;

          connection.query(existUserQuery, username, (err, result) => {
            if (err) return res.status(500).send({ error: err.message });
            else if (result) {
              const existUserVal = Number(result[0].existUsers.toString());
              if (existUserVal > 0) {
                resolve({ username: "duplicateUsername" });
              } else resolve({ username: "available" });
            }
          });
        } else {
          resolve({ username: "NO_USERNAME_FOUND" });
        }
      });

      Promise.all([checkEmailPromise, checkUsernamePromise]).then(
        (resolveObj) => {
          if (
            !(resolveObj[0].email === "NO_EMAIL_FOUND") &&
            !(resolveObj[1].username === "NO_USERNAME_FOUND")
          ) {
            if (
              resolveObj[0].email === "duplicateEmail" &&
              resolveObj[1].username === "duplicateUsername"
            ) {
              res.send({ msg: "DUPLICATE_EMAIL_AND_USERNAME" });
            } else if (resolveObj[0].email === "duplicateEmail") {
              res.send({ msg: "DUPLICATE_EMAIL" });
            } else if (resolveObj[1].username === "duplicateUsername") {
              res.send({ msg: "DUPLICATE_USERNAME" });
            } else {
              next();
            }
          } else if (
            resolveObj[0].email === "NO_EMAIL_FOUND" &&
            !(resolveObj[1].username === "NO_USERNAME_FOUND")
          ) {
            if (resolveObj[1].username === "duplicateUsername")
              res.send({ msg: "DUPLICATE_USERNAME" });
            else next();
          } else if (
            !(resolveObj[0].email === "NO_EMAIL_FOUND") &&
            resolveObj[1].username === "NO_USERNAME_FOUND"
          ) {
            if (resolveObj[0].email === "duplicateEmail")
              res.send({ msg: "DUPLICATE_EMAIL" });
            else next();
          } else {
            next();
          }
        }
      );
    }
    connection.release();
  });
};

const checkDuplicateAdmin = async (req, res, next) => {
  mysqlPool.getConnection((err, connection) => {
    if (err) return res.status(404).send({ error: err.message });
    else if (connection) {
      let email = req.body.email;
      let username = req.body.username;
      let duplicateUsername = false,
        duplicateEmail = false;
      const usernamePromise = new Promise(async (resolve, reject) => {
        const existUserQuery = `SELECT COUNT(*) as existUsers FROM admin WHERE username=?`;
        connection.query(existUserQuery, username, (err, result) => {
          if (err) return res.send({ msg: err.message });
          else if (result) {
            const existUserVal = Number(result[0].existUsers.toString());
            if (existUserVal > 0) duplicateUsername = true;
            resolve();
          }
        });
      });
      const emailPromise = new Promise(async (resolve, reject) => {
        const existEmailQuery = `SELECT COUNT(*) as existEmail FROM admin WHERE email=?`;
        connection.query(existEmailQuery, email, (err, result) => {
          if (err) return res.send({ msg: err.message });
          else if (result) {
            const existEmailVal = Number(result[0].existEmail.toString());
            if (existEmailVal > 0) duplicateEmail = true;
            resolve();
          }
        });
      });
      Promise.allSettled([usernamePromise, emailPromise])
        .then(() => {
          if (duplicateEmail && duplicateUsername)
            reject(new Error("DUPLICATE_EMAIL_AND_USERNAME"));
          else if (duplicateEmail) reject(new Error("DUPLICATE_EMAIL"));
          else if (duplicateUsername) reject(new Error("DUPLICATE_USERNAME"));
          else next();
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
    }
    connection.release();
  });
};

module.exports = {
  auth,
  localVariables,
  verifyUser,
  checkDuplicateUser,
  checkDuplicateAdmin,
  verifyPassword,
};
