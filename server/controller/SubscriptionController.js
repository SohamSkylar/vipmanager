const ENV = require("../config.js");
const mysqlPool = require("../database/mysqlConnection");

const SubtableName = "sublist";
const ServerSubtableName = "serverSublist";

const showAllSubscriptions = async (req, res) => {
  mysqlPool.getConnection((err, connection) => {
    if (err) return res.send(err.message);
    else if (connection) {
      const sqlQuery = `SELECT * FROM ${SubtableName}`;
      connection.query(sqlQuery, (err, result) => {
        if (err) return res.send({ msg: err.message });
        else if (result) {
          return res.json(result);
        }
      });
    }
    connection.release();
  });
};

const addNewSubscription = async (req, res) => {
  mysqlPool.getConnection((err, connection) => {
    if (err) return res.send(err.message);
    else if (connection) {
      console.log("add new sub api activated");
      let subtype = req.body.subtype;
      let flags = req.body.flags;

      if (flags) {
        const sqlQuery = `INSERT INTO ${SubtableName} (subtype, flags) VALUES(?,?)`;
        connection.query(sqlQuery, [subtype, flags], (err, result) => {
          if (err) return res.send({ msg: err.message });
          else if (result) {
            return res.status(201).send({
              msg: "success",
              subid: Number(result.insertId.toString()),
            });
          }
        });
      }
    }
    connection.release();
  });
};

//////////////////////// serversub /////////////////////

const showAllServerSub = async (req, res) => {
  mysqlPool.getConnection((err, connection) => {
    if (err) return res.send(err.message);
    else if (connection) {
      const sqlQuery = `SELECT * FROM ${ServerSubtableName}`;
      connection.query(sqlQuery, (err, result) => {
        if (err) return res.send({ msg: err.message });
        else if (result) {
          return res.json(result);
        }
      });
    }
    connection.release();
  });
};

const addNewServerSub = async (req, res) => {
  mysqlPool.getConnection((err, connection) => {
    if (err) return res.send(err.message);
    else if (connection) {
      console.log("register user api activated");
      let name = req.body.name;
      let price = req.body.price;
      let duration = req.body.duration;
      let subtype = req.body.subtype;

      if (subtype || price || duration || name) {
        const sqlQuery = `INSERT INTO ${ServerSubtableName} (name, price, duration, subtype) VALUES(?,?,?,?)`;
        connection.query(
          sqlQuery,
          [name, price, duration, subtype],
          (err, result) => {
            if (err) return res.send({ msg: err.message });
            else if (result) {
              return res.status(201).send({
                msg: "success",
                serversubid: Number(result.insertId.toString()),
              });
            }
          }
        );
      }
    }
    connection.release();
  });
};
module.exports = {
  showAllSubscriptions,
  addNewSubscription,
  showAllServerSub,
  addNewServerSub,
};
