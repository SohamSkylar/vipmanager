const express = require("express");
const {
  showAllSubscriptions,
  addNewSubscription,
  addNewServerSub,
  showAllServerSub,
} = require("../controller/SubscriptionController");
const {
  checkDuplicateSubscription, checkAllFieldsServerSub,
} = require("../middleware/subscriptionAuth");

const subscriptionRouter = express.Router();

//get
subscriptionRouter.get("/", showAllSubscriptions);
subscriptionRouter.get("/serversub", showAllServerSub);

//post
subscriptionRouter.post("/add", checkDuplicateSubscription, addNewSubscription);
subscriptionRouter.post("/serversub/add", checkAllFieldsServerSub, addNewServerSub);

module.exports = subscriptionRouter;
