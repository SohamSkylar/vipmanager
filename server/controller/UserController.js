const pool = require("../database/conn");

const getAllUser = async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    console.log("db connected");
    const sqlQuery = `SELECT * FROM test`;
    let result = await pool.query(sqlQuery);
    res.json(result);

    // models.Usertest.findAll().then((users) => {
    //   res.json(users)
    // })
  } catch (err) {
    throw err;
  } finally {
    if (conn) return conn.release();
  }
};

const getSpecificUser = async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    console.log("db is active");
    const sqlQuery = `SELECT * FROM user WHERE id=?`;
    let result = await pool.query(sqlQuery, req.params.id);
    res.json(result);
  } catch (err) {
    throw err;
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
    res.json({userid : Number(result.insertId.toString())});
  } catch (err) {
    throw err;
  } finally {
    if (conn) return conn.release();
  }
};

module.exports = { getAllUser, getSpecificUser, addUser };
