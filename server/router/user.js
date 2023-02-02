const express = require("express");
const { localVariables, verifyUser, auth } = require("../middleware/auth.js");

const {
  getAllUser,
  getSpecificUser,
  addUser,
  registerUser,
  loginUser,
  updateUser,
  resetPassword,
} = require("../controller/UserController");
const { generateOTP, verifyOTP } = require("../controller/OTPController.js");

const userRouter = express.Router();

//Get method
userRouter.get("/user", getAllUser);
userRouter.get("/user/:username", getSpecificUser);
userRouter.get("/generateOTP", verifyUser, localVariables, generateOTP);
userRouter.get("/verifyOTP", verifyOTP);

//Put method

userRouter.put("/update", auth, updateUser);
userRouter.put("/resetPassword", verifyUser, resetPassword);

//Post method
userRouter.route("/login").post(loginUser);
userRouter.route("/register").post(registerUser);

//delete method

userRouter.post("/user", addUser);

module.exports = userRouter;
