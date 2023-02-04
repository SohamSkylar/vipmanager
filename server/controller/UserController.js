const pool = require("../database/conn");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ENV = require("../config.js");

const getAllUser = async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    console.log("db connected");
    const sqlQuery = `SELECT * FROM user`;
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
    const sqlQuery = `SELECT * FROM user WHERE username=?`;
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

const addUser = async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    console.log("db is active");
    let name = req.body.name;
    let email = req.body.email;
    const sqlQuery = `INSERT INTO test (name, email) VALUES (?,?)`;
    const result = await pool.query(sqlQuery, [name, email]);
    console.log(result);
    res.json({ userid: Number(result.insertId.toString()) });
  } catch (err) {
    res.send(err.message);
  } finally {
    if (conn) return conn.release();
  }
};

const registerUser = async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    console.log("register user api activated");
    let name = req.body.name;
    let email = req.body.email;
    let username = req.body.username;
    let password = req.body.password;

    const usernameExist = new Promise(async (resolve, reject) => {
      const existUserQuery = `SELECT COUNT(*) as existUsers FROM user WHERE username=?`;
      const existUserQueryResult = await pool.query(existUserQuery, username);
      const existUserVal = Number(
        existUserQueryResult[0].existUsers.toString()
      );
      if (existUserVal > 0) reject(new Error("DUPLICATE_USERNAME"));
      resolve();
    });

    const emailExist = new Promise(async (resolve, reject) => {
      const existEmailQuery = `SELECT COUNT(*) as existEmail FROM user WHERE email=?`;
      const existEmailQueryResult = await pool.query(existEmailQuery, email);
      const existEmailVal = Number(
        existEmailQueryResult[0].existEmail.toString()
      );
      if (existEmailVal > 0) reject(new Error("DUPLICATE_EMAIL"));
      resolve();
    });

    Promise.all([usernameExist, emailExist])
      .then(() => {
        if (password) {
          bcrypt
            .hash(password, 10)
            .then(async (hashedPassword) => {
              const sqlQuery = `INSERT INTO user (name, email, username, password) VALUES(?,?,?,?)`;
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
                error: "unable to hash password",
              });
            });
        }
      })
      .catch((error) => {
        if (error.message === "DUPLICATE_USERNAME")
          res.status(409).send("duplicate username found");
        else if (error.message === "DUPLICATE_EMAIL")
          res.status(410).send("duplicate email found");
        else res.send("unkown error found");
      });
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
      const sqlQuery = `SELECT * FROM user WHERE username=?`;
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
            return res.status(200).send({ error: "Wrong Password!!" });
          const token = jwt.sign(
            {
              userid: result[0].id,
              username: result[0].username,
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
        res.send(err.message);
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
      const checksqlQuery = `SELECT * FROM user WHERE id=?`;
      let checkresult = await pool.query(checksqlQuery, userid);
      if (checkresult.length === 0) {
        throw new Error("WRONG_ID");
      }
      const name = req.body.name;
      const email = req.body.email;
      const username = req.body.username;
      if (!name || !email || !username) {
        throw new Error("ENTER_ALL_FIELDS");
      }
      const sqlQuery = `UPDATE user SET name='${name}',email='${email}',username='${username}' WHERE id=?`;
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
          const sqlQuery = `UPDATE user SET password=? WHERE username=?`;
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

module.exports = {
  getAllUser,
  getSpecificUser,
  addUser,
  registerUser,
  loginUser,
  updateUser,
  resetPassword,
};
