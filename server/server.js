const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const userRouter = require("./router/user");
const dotenv = require("dotenv").config({path: './server/.env'});

const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan("tiny"));
app.disable("x-powered-by");

app.get("/", (req, res) => {
  res.send("homepage");
});

//api routes
app.use("/api", userRouter);


app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
