const pool = require("../database/conn");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ENV = require("../config.js");

const tableName = "serverlist";

const showAllServers = async (req, res) => {
    let conn;
    try{
        conn = await pool.getConnection()
        const sqlQuery = `SELECT * FROM ${tableName}`
        const result = await conn.query(sqlQuery)
        res.json(result)
    }catch (err) {
        res.send(err.message)
    }finally {
        if (conn) return conn.release()
    }
}

module.exports = { showAllServers }