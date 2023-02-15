const pool = require("../database/conn");
const ENV = require("../config.js");

const SubtableName = "sublist";
const ServerSubtableName = "serverSublist";

const showAllSubscriptions = async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const sqlQuery = `SELECT * FROM ${SubtableName}`;
    const result = await conn.query(sqlQuery);
    res.json(result);
  } catch (err) {
    res.send(err.message);
  } finally {
    if (conn) return conn.release();
  }
};

const addNewSubscription = async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    console.log("register user api activated");
    let subtype = req.body.subtype;
    let flags = req.body.flags;

    if (flags) {
      const sqlQuery = `INSERT INTO ${SubtableName} (subtype, flags) VALUES(?,?)`;
      const result = await pool.query(sqlQuery, [subtype, flags]);
      console.log(result);
      res
        .status(201)
        .send({ msg: "success", subid: Number(result.insertId.toString()) });
    }
  } catch (err) {
    res.send(err.message);
  } finally {
    if (conn) return conn.release();
  }
};

//////////////////////// serversub /////////////////////

const showAllServerSub = async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const sqlQuery = `SELECT * FROM ${ServerSubtableName}`;
    const result = await conn.query(sqlQuery);
    res.json(result);
  } catch (err) {
    res.send(err.message);
  } finally {
    if (conn) return conn.release();
  }
};

const addNewServerSub = async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    console.log("register user api activated");
    let name = req.body.name;
    let price = req.body.price;
    let duration = req.body.duration;
    let subtype = req.body.subtype;

    if (subtype || price || duration || name) {
      const sqlQuery = `INSERT INTO ${ServerSubtableName} (name, price, duration, subtype) VALUES(?,?,?,?)`;
      const result = await pool.query(sqlQuery, [
        name,
        price,
        duration,
        subtype,
      ]);
      console.log(result);
      res.status(201).send({
        msg: "success",
        serversubid: Number(result.insertId.toString()),
      });
    }
  } catch (err) {
    res.send(err.message);
  } finally {
    if (conn) return conn.release();
  }
};

//////////////////////// usersub /////////////////////

const createUserSubTable = async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    console.log("createUserSubTable api activated");
    let UserSubtableName = req.body.name;
    const correctedName = UserSubtableName.split(' ').join('_')

    if (UserSubtableName) {
      const sqlQuery = `CREATE TABLE IF NOT EXISTS ${correctedName} (
        username VARCHAR(45) NOT NULL,
        subtype VARCHAR(45) NOT NULL,
        expireStamp INT(45) NOT NULL,
        created_at DATETIME DEFAULT NOW(),
        PRIMARY KEY (username))
      ENGINE = InnoDB`;
      const result = await pool.query(sqlQuery);
      console.log(result);
      res.status(201).send({
        msg: "success",
      });
    }
  } catch (err) {
    res.send({err: err.message});
  } finally {
    if (conn) return conn.release();
  }
};

const showAllUserSub = async (req, res) => {
  let conn;
  try {
    const UserSubtableName = req.body.name;
    conn = await pool.getConnection();
    const sqlQuery = `SELECT * FROM ${UserSubtableName}`;
    const result = await conn.query(sqlQuery);
    res.json(result);
  } catch (err) {
    res.send(err.message);
  } finally {
    if (conn) return conn.release();
  }
};

const showSpecificUserSub = async (req, res) => {
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

const addNewUserSub = async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    console.log("register user api activated");
    let name = req.body.name;
    let price = req.body.price;
    let duration = req.body.duration;
    let subtype = req.body.subtype;

    if (subtype || price || duration || name) {
      const sqlQuery = `INSERT INTO ${ServerSubtableName} (name, price, duration, subtype) VALUES(?,?,?,?)`;
      const result = await pool.query(sqlQuery, [
        name,
        price,
        duration,
        subtype,
      ]);
      console.log(result);
      res.status(201).send({
        msg: "success",
        serversubid: Number(result.insertId.toString()),
      });
    }
  } catch (err) {
    res.send(err.message);
  } finally {
    if (conn) return conn.release();
  }
};

module.exports = {
  showAllSubscriptions,
  addNewSubscription,
  showAllServerSub,
  addNewServerSub,
  createUserSubTable,
};
