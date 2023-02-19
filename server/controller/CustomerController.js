const pool = require("../database/conn");
const ENV = require("../config.js");

const createCustomerTable = async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    console.log("createUserSubTable api activated");
    let UserSubtableName = req.body.tableName;
    const correctedName = UserSubtableName.split(" ").join("_");

    if (UserSubtableName) {
      const sqlQuery = `CREATE TABLE IF NOT EXISTS ${correctedName} (
          userid VARCHAR(45) NOT NULL,
          subtype VARCHAR(45) NOT NULL,
          duration INT(45) NOT NULL,
          created_at DATETIME DEFAULT NOW(),
          CONSTRAINT customer_pk PRIMARY KEY (userid, subtype))
        ENGINE = InnoDB`;
      const result = await pool.query(sqlQuery);
      console.log(result);
      res.status(201).send({
        msg: "success",
      });
    }
  } catch (err) {
    res.send({ err: err.message });
  } finally {
    if (conn) return conn.release();
  }
};

const addNewCustomer = async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    console.log("register user api activated");
    let servername = req.body.servername;
    let userid = req.body.userid;
    let duration = req.body.duration;
    let subtype = req.body.subtype;

    if (subtype || servername || duration || userid) {
      const sqlQuery = `INSERT INTO ${servername} (userid, subtype, duration) VALUES(?,?,?)`;
      const result = await pool.query(sqlQuery, [userid, subtype, duration]);
      console.log(result);
      res.status(201).send({
        msg: "success",
      });
    }
  } catch (err) {
    if (err.message.includes("Duplicate")) res.send({ msg: "DUPLICATE_ENTRY" });
    else res.send({ err: err.message });
  } finally {
    if (conn) return conn.release();
  }
};

const getCustomerData = async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    console.log("getCustomerData is active");
    const tableName = req.tableName;
    if (tableName.length === 0) res.send({ msg: "NO_DATA" });
    else {
      let conditionVar = [];
      for (let i = 0; i < tableName.length; i++) {
        conditionVar[i] = `SELECT *,"${tableName[i]}" as servername  FROM ${tableName[i]} WHERE userid="${req.params.userid}"`;
      }
      const sqlQuery = conditionVar.join(" UNION ");
      // console.log(conditionString)
      // console.log(tableName)
      let result = await pool.query(sqlQuery, req.params.userid);
      if (result.length === 0) {
        res.send({ msg: "NO_DATA" });
      } else {
        res.json(result);
      }
      // res.json(result);
      // console.log(tableName)
      // res.send('ok')
    }
  } catch (err) {
    res.send({ msg: "Invalid Username", err: err.message });
  } finally {
    if (conn) return conn.release();
  }
};

const showAllCustomers = async (req, res) => {
  let conn;
  try {
    const tableName = req.query.tableName;
    conn = await pool.getConnection();
    const sqlQuery = `SELECT * FROM ${tableName}`;
    const result = await conn.query(sqlQuery);
    res.json(result);
  } catch (err) {
    res.send(err.message);
  } finally {
    if (conn) return conn.release();
  }
};

const activeCustomer = async (req, res) => {
  const userid = req.user.userid;
  if (userid) res.status(201).json({ userid: userid, msg: "success" });
  else res.status(201).json({ msg: "NO_USER_FOUND" });
};

module.exports = {
  createCustomerTable,
  addNewCustomer,
  showAllCustomers,
  activeCustomer,
  getCustomerData,
};
