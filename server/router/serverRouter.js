const express = require("express");
const { showAllServers } = require("../controller/ServerController");

const serverRouter = express.Router();

//get
serverRouter.get('/', showAllServers);

module.exports = serverRouter;