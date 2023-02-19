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
module.exports = {
  showAllSubscriptions,
  addNewSubscription,
  showAllServerSub,
  addNewServerSub,
};
