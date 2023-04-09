// const mariadb = require("mariadb");
// const dotenv = require("dotenv").config({ path: "./server/.env" });

// const pool = mariadb.createPool({
//   host: process.env.HOST,
//   user: process.env.USER,
//   password: process.env.PASS,
//   database: process.env.DB_HOST,
//   connectionLimit: 30,
// });

// module.exports = pool;

// const createConn = async () => {
//   let conn;
//   try{
//     conn = await pool.getConnection()

//   }catch (err){
//     throw err;
//   }finally{
//     if(conn) return conn.release()
//   }

// }
