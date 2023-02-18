const pool = require("../database/conn");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ENV = require("../config.js");
const SteamCommunity = require("steamcommunity");

const tableName = "user";

const getAllUser = async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    console.log("db connected");
    const sqlQuery = `SELECT * FROM ${tableName}`;
    let result = await pool.query(sqlQuery);
    res.json(result);

    // models.Usertest.findAll().then((users) => {
    //   res.json(users)
    // })
  } catch (err) {
    res.send(err.message);
  } finally {
    if (conn) return conn.release();
  }
};

const getSpecificUser = async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    console.log("db is active");
    const sqlQuery = `SELECT * FROM ${tableName} WHERE username=?`;
    let result = await pool.query(sqlQuery, req.params.username);
    if (result.length === 0) {
      res.send("No user found...");
    } else {
      res.json(result);
    }
  } catch (err) {
    res.send("Invalid Username");
  } finally {
    if (conn) return conn.release();
  }
};
//   let conn;
//   try {
//     conn = await pool.getConnection();
//     console.log("register user api activated");
//     let name = req.body.name;
//     let email = req.body.email;
//     let username = req.body.username;
//     let password = req.body.password;

//     const usernameExist = new Promise(async (resolve, reject) => {
//       const existUserQuery = `SELECT COUNT(*) as existUsers FROM user WHERE username=?`;
//       const existUserQueryResult = await pool.query(existUserQuery, username);
//       const existUserVal = Number(
//         existUserQueryResult[0].existUsers.toString()
//       );
//       if (existUserVal > 0) reject(new Error("DUPLICATE_USERNAME"));
//       resolve();
//     });

//     const emailExist = new Promise(async (resolve, reject) => {
//       const existEmailQuery = `SELECT COUNT(*) as existEmail FROM user WHERE email=?`;
//       const existEmailQueryResult = await pool.query(existEmailQuery, email);
//       const existEmailVal = Number(
//         existEmailQueryResult[0].existEmail.toString()
//       );
//       if (existEmailVal > 0) reject(new Error("DUPLICATE_EMAIL"));
//       resolve();
//     });

//     Promise.all([usernameExist, emailExist])
//       .then(() => {
//         if (password) {
//           bcrypt
//             .hash(password, 10)
//             .then(async (hashedPassword) => {
//               const sqlQuery = `INSERT INTO user (name, email, username, password) VALUES(?,?,?,?)`;
//               const result = await pool.query(sqlQuery, [
//                 name,
//                 email,
//                 username,
//                 hashedPassword,
//               ]);
//               console.log(result);
//               res.json({ userid: Number(result.insertId.toString()) });
//             })
//             .catch((error) => {
//               return res.status(500).send({
//                 error: "unable to hash password",
//               });
//             });
//         }
//       })
//       .catch((error) => {
//         if (error.message === "DUPLICATE_USERNAME")
//           res.status(409).send("duplicate username found");
//         else if (error.message === "DUPLICATE_EMAIL")
//           res.status(410).send("duplicate email found");
//         else res.send("unkown error found");
//       });
//   } catch (err) {
//     res.send(err.message);
//   } finally {
//     if (conn) return conn.release();
//   }
// };

const registerUser = async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
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
          const result = await pool.query(sqlQuery, [
            name,
            email,
            username,
            hashedPassword,
          ]);
          console.log(result);
          res.json({ msg: "success", userid: Number(result.insertId.toString()) });
        })
        .catch((error) => {
          return res.status(500).send({
            error: error.message,
          });
        });
    }
  } catch (err) {
    res.send(err.message);
  } finally {
    if (conn) return conn.release();
  }
};

const addAdmin = async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
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
          const result = await pool.query(sqlQuery, [
            name,
            email,
            username,
            hashedPassword,
          ]);
          console.log(result);
          res.json({ userid: Number(result.insertId.toString()) });
        })
        .catch((error) => {
          return res.status(500).send({
            error: error.message,
          });
        });
    }
  } catch (err) {
    res.send(err.message);
  } finally {
    if (conn) return conn.release();
  }
};

const loginUser = async (req, res) => {
  let conn;
  try {
    let username = req.body.username;
    let password = req.body.password;
    let result;
    conn = await pool.getConnection();
    console.log("login api is active");
    const checkUser = new Promise(async (resolve, reject) => {
      const sqlQuery = `SELECT * FROM ${tableName} WHERE username=?`;
      result = await pool.query(sqlQuery, username);
      //res.send('ok')
      if (result.length === 0) reject(new Error("INVALID_USERNAME"));
      else if (result.length > 1) reject(new Error("DUPLICATE_USERNAME"));
      else resolve();
    });

    Promise.all([checkUser])
      .then(async () => {
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
      })
      .catch((err) => {
        res.status(400).send(err.message);
      });
  } catch (err) {
    res.send(err.message);
  } finally {
    if (conn) return conn.release();
  }
};

const loginAdmin = async (req, res) => {
  let conn;
  try {
    let username = req.body.username;
    let password = req.body.password;
    let result;
    conn = await pool.getConnection();
    console.log("login api is active");
    const checkUser = new Promise(async (resolve, reject) => {
      const sqlQuery = `SELECT * FROM admin WHERE username=?`;
      result = await pool.query(sqlQuery, username);
      //res.send('ok')
      if (result.length === 0) reject(new Error("INVALID_USERNAME"));
      else if (result.length > 1) reject(new Error("DUPLICATE_USERNAME"));
      else resolve();
    });

    Promise.all([checkUser])
      .then(async () => {
        const querypass = result[0].password;
        await bcrypt.compare(password, querypass).then((passwordCheck) => {
          if (!passwordCheck)
            return res.status(400).send({ error: "Wrong Password!!" });
          const token = jwt.sign(
            {
              userid: result[0].id,
              username: result[0].username,
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
      })
      .catch((err) => {
        res.status(400).send(err.message);
      });
  } catch (err) {
    res.send(err.message);
  } finally {
    if (conn) return conn.release();
  }
};

const updateUser = async (req, res) => {
  let conn;
  try {
    const { userid } = req.user;
    conn = await pool.getConnection();
    console.log("update api activated");
    if (userid) {
      const checksqlQuery = `SELECT * FROM ${tableName} WHERE id=?`;
      let checkresult = await pool.query(checksqlQuery, userid);
      if (checkresult.length === 0) {
        throw new Error("WRONG_ID");
      }
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
        return res.send({ msg: "Wrong body data" });
      }
      const result = await pool.query(sqlQuery, userid);
      console.log(result);
      if (Number(result.insertId.toString()) >= 0) res.json({ msg: "success" });
    } else {
      throw new Error("INVALID_QUERY");
    }
  } catch (error) {
    res.status(401).send({ error: error.message });
  } finally {
    if (conn) return conn.release();
  }
};

const resetPassword = async (req, res) => {
  let conn;
  if (!req.app.locals.resetSession) return res.json({ msg: "OTP_EXPIRED" });
  try {
    conn = await pool.getConnection();

    const { password } = req.body;
    const { username } = req.query;

    if (password) {
      bcrypt
        .hash(password, 10)
        .then(async (hashedPassword) => {
          const sqlQuery = `UPDATE ${tableName} SET password=? WHERE username=?`;
          const result = await pool.query(sqlQuery, [hashedPassword, username]);
          if (Number(result.insertId.toString()) >= 0)
            res.json({ msg: "success" });
          req.app.locals.resetSession = false;
        })
        .catch((error) => {
          return res.status(500).send({ error: error.message });
        });
    }
  } catch (error) {
    res.send(error.message);
  } finally {
    if (conn) return conn.release();
  }
};

const activeUser = async (req, res) => {
  const userType = req.type;
  if (userType === "admin") {
    res.status(201).json({ msg: "active", type: "admin" });
  } else res.status(201).json({ msg: "active", type: "customer" });
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
          res.send({ steamid: steamID, profilename: details.name, msg: "success" });
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
};
