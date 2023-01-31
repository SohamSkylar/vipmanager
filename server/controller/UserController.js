const pool = require("../database/conn");
const bcrypt  = require('bcrypt');
const JWT = require('jsonwebtoken');
const ENV = require('../config.js');


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
    let username = req.body.username;
    let email = req.body.email;
    const sqlQuery = `INSERT INTO user (name, email, username) VALUES (?,?,?)`;
    const result = await pool.query(sqlQuery, [name, email, username]);
    console.log(result);
    res.json({userid : Number(result.insertId.toString())});
  } catch (err) {
    throw err;
  } finally {
    if (conn) return conn.release();
  }
};

const login = async(req,res) =>{
  let conn;
  try {
    let username = req.body.username;
    let bodypassword = req.body.password;
    let result;
    conn = await pool.getConnection();
    console.log("db is active");
    const checkUser = new Promise( async (resolve, reject) => {
    const sqlQuery = `SELECT * FROM user WHERE username=? `
    result = await pool.query(sqlQuery, username);
    res.json(result.username)
    // console.log(passreturn)
    // res.send(passreturn)
    //const comparepass = bcrypt.compare(bodypassword, result.password)

    resolve()
    })
    
    // Promise.all([checkUser]).then(()=>{
    //   console.log("result: "+Object.values(result))
    //   const comparepass = bcrypt.compare(bodypassword, result.password).catch(error => {
        
    //   })
    //   //   .then(passwordCheck => {
    //   //     if(!passwordCheck) 
    //   // return 
    //   // res.status(400).send({error:"Password doesnt EXIST"})
    //   //   })
    //   res.send(comparepass)
    // })
    
    
    // bcrypt.compare(password, result.password)
    // .then(passwordCheck => {
      

    //   //Create JWT Token
    //   const token = JWT.sign({
    //     userid: result._id,
    //     username: result.username,
    //   }, 'secret', {expiresIn:"24h"});
    //   return res.status(200).send({
    //     msg: "Login Successful...",
    //     username:result.username,
    //     token
    //   })

    // })
    // .catch(error => {
    //   return res.status(400).send({error: "Password doesnt match"})
    // })
    // console.log(result);
    // res.json({userid : Number(result.insertId.toString())});
  } catch (err) {
    throw err;
  } finally {
    if (conn) return conn.release();
  }
}

module.exports = { getAllUser, getSpecificUser, addUser, login };
