const express = require("express");
const {
  createCustomerTable,
  addNewCustomer,
  showAllCustomers,
} = require("../controller/CustomerController");
const {
  showAllSubscriptions,
  addNewSubscription,
  addNewServerSub,
  showAllServerSub,
} = require("../controller/SubscriptionController");
const {
  checkDuplicateSubscription,
  checkAllFieldsServerSub,
  verifyCustomer,
  checkAllFieldsCustomer,
} = require("../middleware/subscriptionAuth");

const subscriptionRouter = express.Router();

//get
subscriptionRouter.get("/", showAllSubscriptions);
subscriptionRouter.get("/serversub", showAllServerSub);
subscriptionRouter.get("/customer", showAllCustomers);

//post
subscriptionRouter.post("/add", checkDuplicateSubscription, addNewSubscription);
subscriptionRouter.post(
  "/serversub/add",
  checkAllFieldsServerSub,
  addNewServerSub
);
subscriptionRouter.post(
  "/customer/createTable",
  checkAllFieldsServerSub,
  createCustomerTable
);
subscriptionRouter.post(
  "/customer/add",
  checkAllFieldsCustomer,
  verifyCustomer,
  addNewCustomer
);

module.exports = subscriptionRouter;
