const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ENV = require("../config.js");
const SteamCommunity = require("steamcommunity");
const mysqlPool = require("../database/mysqlConnection");

const tableName = "user";

const getAllUser = async (req, res) => {
  mysqlPool.getConnection((err, connection) => {
    if (err) return res.send({ msg: err.message });
    else if (connection) {
      const sqlQuery = `SELECT * FROM ${tableName}`;
      connection.query(sqlQuery, (err, result) => {
        if (err) return res.send({ msg: err.message });
        else if (result) {
          res.json(result);
        }
      });
    }
    connection.release();
  });
};

const getSpecificUser = async (req, res) => {
  mysqlPool.getConnection((err, connection) => {
    if (err) return res.send({ msg: err.message });
    else if (connection) {
      console.log("db is active");
      const sqlQuery = `SELECT * FROM ${tableName} WHERE username=?`;
      connection.query(sqlQuery, req.params.username, (err, result) => {
        if (err) return res.send("Invalid Username");
        else if (result) {
          if (result.length === 0) {
            res.send("No user found...");
          } else {
            res.json(result);
          }
        }
      });
    }
    connection.release();
  });
};

const getSpecificUserID = async (req, res) => {
  mysqlPool.getConnection((err, connection) => {
    if (err) return res.send({ msg: err.message });
    else if (connection) {
      const sqlQuery = `SELECT id FROM ${tableName} WHERE username=?`;
      connection.query(sqlQuery, req.params.username, (err, result) => {
        if (err) return res.send("Invalid Username");
        else if (result) {
          const row = JSON.parse(JSON.stringify(result));
          if (result.length === 0) {
            res.send({ msg: "NO_USER_FOUND" });
          } else {
            res.json({ msg: "success", userid: row[0].id });
          }
        }
      });
    }
    connection.release();
  });
};

const registerUser = async (req, res) => {
  mysqlPool.getConnection((err, connection) => {
    if (err) return res.send({ msg: err.message });
    else if (connection) {
      console.log("register user api activated");
      let name = req.body.name;
      let email = req.body.email;
      let username = req.body.username;
      let password = req.body.password;

      if (password) {
        bcrypt
          .hash(password, 10)
          .then(async (hashedPassword) => {
            const sqlQuery = `INSERT INTO ${tableName} (name, email, username, password) VALUES(?,?,?,?)`;
            connection.query(
              sqlQuery,
              [name, email, username, hashedPassword],
              (err, result) => {
                if (err) return res.status(500).send({ msg: err.message });
                else if (result) {
                  res.json({
                    msg: "success",
                    userid: Number(result.insertId.toString()),
                  });
                }
              }
            );
          })
          .catch((error) => {
            return res.status(500).send({
              error: error.message,
            });
          });
      }
    }
    connection.release();
  });
};

const addAdmin = async (req, res) => {
  mysqlPool.getConnection((err, connection) => {
    if (err) return res.send({ msg: err.message });
    else if (connection) {
      console.log("register user api activated");
      let name = req.body.name;
      let email = req.body.email;
      let username = req.body.username;
      let password = req.body.password;

      if (password) {
        bcrypt
          .hash(password, 10)
          .then(async (hashedPassword) => {
            const sqlQuery = `INSERT INTO admin (name, email, username, password) VALUES(?,?,?,?)`;
            connection.query(
              sqlQuery,
              [name, email, username, hashedPassword],
              (err, result) => {
                if (err) return res.status(500).send({ msg: err.message });
                else if (result) {
                  res.json({
                    msg: "success",
                    userid: Number(result.insertId.toString()),
                  });
                }
              }
            );
          })
          .catch((error) => {
            return res.status(500).send({
              error: error.message,
            });
          });
      }
    }
    connection.release();
  });
};

const loginUser = async (req, res) => {
  mysqlPool.getConnection((err, connection) => {
    if (err) return res.send({ msg: err.message });
    else if (connection) {
      let username = req.body.username;
      let password = req.body.password;
      console.log("login api is active");
      const sqlQuery = `SELECT * FROM ${tableName} WHERE username=?`;
      connection.query(sqlQuery, username, async (err, result) => {
        if (err) return res.send({ msg: err.message });
        else if (result) {
          if (result.length === 0)
            return res.status(400).send("INVALID_USERNAME");
          else if (result.length > 1)
            return res.status(400).send("DUPLICATE_USERNAME");
          else {
            const querypass = result[0].password;
            await bcrypt.compare(password, querypass).then((passwordCheck) => {
              if (!passwordCheck)
                return res.status(400).send({ error: "Wrong Password!!" });
              const token = jwt.sign(
                {
                  userid: result[0].id,
                  username: result[0].username,
                  steamid: result[0].steamid,
                  usertype: "customer",
                },
                ENV.JWT_SECRET,
                { expiresIn: "24h" }
              );
              return res.status(200).send({
                msg: "Login Successful...",
                username: result[0].username,
                token,
              });
            });
          }
        }
      });
    }
    connection.release();
  });
};

const loginAdmin = async (req, res) => {
  mysqlPool.getConnection((err, connection) => {
    if (err) return res.send({ msg: err.message });
    else if (connection) {
      let username = req.body.username;
      let password = req.body.password;
      console.log("login api is active");
      const sqlQuery = `SELECT * FROM admin WHERE username=?`;
      connection.query(sqlQuery, username, async (err, result) => {
        if (err) return res.send({ msg: err.message });
        else if (result) {
          if (result.length === 0)
            return res.status(400).send("INVALID_USERNAME");
          else if (result.length > 1)
            return res.status(400).send("DUPLICATE_USERNAME");
          else {
            const querypass = result[0].password;
            await bcrypt.compare(password, querypass).then((passwordCheck) => {
              if (!passwordCheck)
                return res.status(400).send({ error: "Wrong Password!!" });
              const token = jwt.sign(
                {
                  userid: result[0].id,
                  username: result[0].username,
                  steamid: result[0].steamid,
                  usertype: "admin",
                },
                ENV.JWT_SECRET,
                { expiresIn: "24h" }
              );
              return res.status(200).send({
                msg: "Login Successful...",
                username: result[0].username,
                token,
              });
            });
          }
        }
      });
    }
    connection.release();
  });
};

const updateUser = async (req, res) => {
  mysqlPool.getConnection((err, connection) => {
    if (err) return res.send({ msg: err.message });
    else if (connection) {
      const { userid } = req.user;
      console.log("update api activated");
      if (userid) {
        const checksqlQuery = `SELECT * FROM ${tableName} WHERE id=?`;
        connection.query(checksqlQuery, userid, (err, result) => {
          if (err) return res.send({ msg: err.message });
          else if (result) {
            if (result.length === 0)
              return res.status(401).send({ error: "WRONG_ID" });
          }
        });
        const name = req.body.name;
        const email = req.body.email;
        const username = req.body.username;
        const steamid = req.body.steamid;
        let sqlQuery;
        if (name) {
          sqlQuery = `UPDATE ${tableName} SET name='${name}' WHERE id=?`;
        } else if (username) {
          sqlQuery = `UPDATE ${tableName} SET username='${username}' WHERE id=?`;
        } else if (email) {
          sqlQuery = `UPDATE ${tableName} SET email='${email}' WHERE id=?`;
        } else if (steamid) {
          sqlQuery = `UPDATE ${tableName} SET steamid='${steamid}' WHERE id=?`;
        } else {
          connection.release();
          return res.send({ msg: "Wrong body data" });
        }
        connection.query(sqlQuery, userid, (err, result) => {
          if (err) return res.send({ msg: err.message });
          else if (result) {
            if (Number(result.insertId.toString()) >= 0)
              res.json({ msg: "success" });
          }
        });
      } else {
        res.status(401).send({ error: "INVALID_QUERY" });
      }
    }
    connection.release();
  });
};

const resetPassword = async (req, res) => {
  // let conn;
  // if (!req.app.locals.resetSession) return res.json({ msg: "OTP_EXPIRED" });
  // try {
  //   conn = await pool.getConnection();

  //   const { password } = req.body;
  //   const { username } = req.query;

  //   if (password) {
  //     bcrypt
  //       .hash(password, 10)
  //       .then(async (hashedPassword) => {
  //         const sqlQuery = `UPDATE ${tableName} SET password=? WHERE username=?`;
  //         const result = await pool.query(sqlQuery, [hashedPassword, username]);
  //         if (Number(result.insertId.toString()) >= 0)
  //           res.json({ msg: "success" });
  //         req.app.locals.resetSession = false;
  //       })
  //       .catch((error) => {
  //         return res.status(500).send({ error: error.message });
  //       });
  //   }
  // } catch (error) {
  //   res.send(error.message);
  // } finally {
  //   if (conn) return conn.release();
  // }
  if (!req.app.locals.resetSession) return res.json({ msg: "OTP_EXPIRED" });
  mysqlPool.getConnection((err, connection) => {
    if (err) return res.send({ msg: err.message });
    else if (connection) {
      const { password } = req.body;
      const { username } = req.query;

      if (password) {
        bcrypt
          .hash(password, 10)
          .then(async (hashedPassword) => {
            const sqlQuery = `UPDATE ${tableName} SET password=? WHERE username=?`;
            connection.query(
              sqlQuery,
              [hashedPassword, username],
              (err, result) => {
                if (err) return res.send({ msg: err.message });
                else if (result) {
                  req.app.locals.resetSession = false;
                  if (Number(result.insertId.toString()) >= 0)
                    return res.json({ msg: "success" });
                }
              }
            );
          })
          .catch((error) => {
            return res.status(500).send({ error: error.message });
          });
      }
    }
    connection.release();
  });
};

const activeUser = async (req, res) => {
  const userType = req.type;
  const username = req.user.username;
  if (userType === "admin") {
    res.status(201).json({ msg: "active", type: "admin" });
  } else
    res
      .status(201)
      .json({ msg: "active", type: "customer", username: username });
};

const checkSteamID = async (req, res) => {
  try {
    let steamidurl = req.body.steamid;
    const steamIDBreaker = steamidurl.split("/");
    if (steamIDBreaker.length > 4) var steamIDRaw = steamIDBreaker[4];
    else return res.send({ msg: "WRONG_URL" });

    let regExp = /[a-zA-Z]/g;
    let community = new SteamCommunity();
    if (regExp.test(steamIDRaw)) {
      community.getSteamUser(steamIDRaw, (err, details) => {
        if (err) {
          res.send({ msg: "WRONG_ID" });
        } else {
          // console.log(details);
          let newSteamID = BigInt(details.steamID.accountid);
          let steamID = `STEAM_1:${newSteamID % 2n}:${newSteamID / 2n}`;
          res.send({
            steamid: steamID,
            profilename: details.name,
            msg: "success",
          });
        }
      });
    } else {
      let accountID = BigInt(steamIDRaw) - 76561197960265728n;
      let SteamIDObj = SteamCommunity.SteamID;
      let newSteamID = new SteamIDObj(`[U:1:${accountID}]`);
      new Promise((resolve, reject) => {
        community.getSteamUser(newSteamID, (err, details) => {
          if (err) {
            reject(err);
          } else {
            resolve(details.name);
          }
        });
      })
        .then(
          (name) => {
            // console.log(accountID);
            if (accountID < 0n) accountID = accountID - accountID * 2n;
            let steamID = `STEAM_1:${accountID % 2n}:${accountID / 2n}`;
            res.send({ steamid: steamID, profilename: name, msg: "success" });
          },
          (err) => {
            res.send({ msg: "WRONG_ID" });
          }
        )
        .catch((err) => {
          return res.send({ msg: err.message });
        });
    }
  } catch (err) {
    if (err.message.includes("Unknown SteamID input format"))
      res.send({ msg: "WRONG_ID" });
    else res.send({ msg: err.message });
  }
};

module.exports = {
  getAllUser,
  getSpecificUser,
  registerUser,
  loginUser,
  updateUser,
  resetPassword,
  activeUser,
  loginAdmin,
  addAdmin,
  checkSteamID,
  getSpecificUserID,
};
