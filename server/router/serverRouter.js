const express = require("express");
const { showAllServers, addNewServer } = require("../controller/ServerController");
const checkDuplicateServer = require("../middleware/serverAuth");

const serverRouter = express.Router();

//get
serverRouter.get('/', showAllServers);

//post
serverRouter.post('/add', checkDuplicateServer, addNewServer);

module.exports = serverRouter;