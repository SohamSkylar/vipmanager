const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const userRouter = require("./router/userRouter");
const dotenv = require("dotenv").config({ path: "./server/.env" });
var fs = require("fs");
const path = require("path");
const pool = require("./database/conn");
const serverRouter = require("./router/serverRouter");

const PORT = process.env.PORT;

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
);
app.options("*", cors());
app.use(cors());
app.use(morgan("tiny"));
app.disable("x-powered-by");

app.get("/", (req, res) => {
  res.send("homepage");
});

//api routes
app.use("/api", userRouter);
app.use("/api/server", serverRouter)

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});

const autoCreateTable = () => {
  const tableFiles = ["userTable.sql", "serverTable.sql", "adminTable.sql"]
  tableFiles.forEach(async tableName => {
    const generatedScript = fs
    .readFileSync(path.join(__dirname, `./models/${tableName}`))
    .toString();
  try {
    const query = await pool.query(generatedScript)
    // console.log(query);
    } catch (err) {
    console.log(err.message);
  }
  });
};
autoCreateTable();
