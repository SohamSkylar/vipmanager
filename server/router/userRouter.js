const express = require("express");
const {
  localVariables,
  verifyUser,
  auth,
  checkDuplicateUser,
  checkDuplicateAdmin,
} = require("../middleware/auth.js");

const {
  getAllUser,
  getSpecificUser,
  registerUser,
  loginUser,
  updateUser,
  resetPassword,
  activeUser,
  loginAdmin,
  addAdmin,
  checkSteamID,
} = require("../controller/UserController");
const { generateOTP, verifyOTP } = require("../controller/OTPController.js");

const userRouter = express.Router();

//Get method
userRouter.get("/user", getAllUser);
userRouter.get("/user/:username", getSpecificUser);
userRouter.get("/generateOTP", verifyUser, localVariables, generateOTP);
userRouter.get("/verifyOTP", verifyOTP);
userRouter.get("/auth", auth, activeUser);
userRouter.get("/steamid", checkSteamID);

//Put method

userRouter.patch("/update", auth, updateUser);


userRouter.put("/resetPassword", verifyUser, resetPassword);

//Post method
userRouter.post("/adminlogger", loginAdmin);
userRouter.post("/login", loginUser);
userRouter.post("/register", checkDuplicateUser, registerUser);
userRouter.post("/addadmin", checkDuplicateAdmin, addAdmin);

//delete method

module.exports = userRouter;
