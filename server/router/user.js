const express = require("express");
const Auth = require("../middleware/auth.js");
const {
  getAllUser,
  getSpecificUser,
  addUser,
  registerUser,
  loginUser,
  updateUser,
} = require("../controller/UserController");
const { generateOTP, verifyOTP } = require("../controller/OTPController.js");

const userRouter = express.Router();

//Get method
userRouter.get("/user", getAllUser);
userRouter.get("/user/:username", getSpecificUser);
userRouter.get("/generateOTP", generateOTP);
userRouter.get("/verifyOTP", verifyOTP);

//Put method

userRouter.put("/update", Auth, updateUser);

//Post method
userRouter.route("/login").post(loginUser);
userRouter.route("/register").post(registerUser);

//delete method

userRouter.post("/user", addUser);

module.exports = userRouter;
