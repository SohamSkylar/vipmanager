const ENV = require("../config.js");
const mysqlPool = require("../database/mysqlConnection");

const createCustomerTable = async (req, res) => {
  mysqlPool.getConnection((err, connection) => {
    if (err) return res.send({ msg: err.message });
    else if (connection) {
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
        connection.query(sqlQuery, (err, result) => {
          if (err) return res.send({ msg: err.message });
          else if (result) {
            res.status(201).send({ msg: "success" });
          }
        });
      }
    }
    connection.release();
  });
};

const addNewCustomer = async (req, res) => {
  mysqlPool.getConnection((err, connection) => {
    if (err) return res.send({ msg: err.message });
    else if (connection) {
      console.log("register user api activated");
      let servername = req.body.servername;
      let userid = req.body.userid;
      let duration = req.body.duration;
      let subtype = req.body.subtype;

      if (subtype || servername || duration || userid) {
        const sqlQuery = `INSERT INTO ${servername} (userid, subtype, duration) VALUES(?,?,?)`;

        connection.query(
          sqlQuery,
          [userid, subtype, duration],
          (err, result) => {
            if (err) {
              if (err.message.includes("Duplicate"))
                return res.send({ msg: "DUPLICATE_ENTRY" });
              else return res.send({ msg: err.message });
            } else if (result) {
              res.status(201).send({
                msg: "success",
              });
            }
          }
        );
      }
    }
    connection.release();
  });
};

const getCustomerData = async (req, res) => {
  mysqlPool.getConnection((err, connection) => {
    if (err) return res.send({ msg: err.message });
    else if (connection) {
      console.log("getCustomerData is active");
      const tableName = req.tableName;
      if (tableName.length === 0) return res.send({ msg: "NO_DATA" });
      else {
        let conditionVar = [];
        for (let i = 0; i < tableName.length; i++) {
          conditionVar[
            i
          ] = `SELECT *,"${tableName[i]}" as servername  FROM ${tableName[i]} WHERE userid="${req.params.userid}"`;
        }
        const sqlQuery = conditionVar.join(" UNION ");
        connection.query(sqlQuery, req.params.userid, (err, result) => {
          if (err) return res.send({ msg: err.message });
          else if (result) {
            if (result.length === 0) {
              res.send({ msg: "NO_DATA" });
            } else {
              res.json(result);
            }
          }
        });
      }
    }
    connection.release();
  });
};

const showAllCustomers = async (req, res) => {
  mysqlPool.getConnection((err, connection) => {
    if (err) return res.send({ msg: err.message });
    else if (connection) {
      const tableName = req.query.tableName;
      const sqlQuery = `SELECT * FROM ${tableName}`;
      connection.query(sqlQuery, (err, result) => {
        if (err) return res.send({ msg: err.message });
        else if (result) {
          res.send(result);
        }
      });
      connection.release();
    }
  });
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
