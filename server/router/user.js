const express = require("express");
const {
  getAllUser,
  getSpecificUser,
  addUser,
  login,
} = require("../controller/UserController");

const userRouter = express.Router();

//Get method
userRouter.get('/', (req, res)=>{
  res.send('api route')
})
userRouter.get("/user", getAllUser);
userRouter.get("/user/:id", getSpecificUser);

//Put method

//Post method
userRouter.post('/login', login);



//delete method

userRouter.post("/user", addUser);

module.exports = userRouter;
