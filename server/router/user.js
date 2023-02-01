const express = require("express");
const {
  getAllUser,
  getSpecificUser,
  addUser,
  registerUser,
  loginUser,
} = require("../controller/UserController");

const userRouter = express.Router();

//Get method
userRouter.get("/user", getAllUser);
userRouter.get("/user/:id", getSpecificUser);

//Put method


//Post method
userRouter.route('/login').post(loginUser)
userRouter.route("/register").post(registerUser)

//delete method

userRouter.post("/user", addUser);

module.exports = userRouter;
