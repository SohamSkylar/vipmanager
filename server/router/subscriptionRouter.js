const express = require("express");
const {
  createCustomerTable,
  addNewCustomer,
  showAllCustomers,
  activeCustomer,
  getCustomerData,
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
  authCustomer,
  getAllCustomerTables,
} = require("../middleware/subscriptionAuth");

const subscriptionRouter = express.Router();

//get
subscriptionRouter.get("/", showAllSubscriptions);
subscriptionRouter.get("/serversub", showAllServerSub);
subscriptionRouter.get("/customer", showAllCustomers);
// subscriptionRouter.get("/customer/id", getCustomerData);
subscriptionRouter.get("/customer/auth", authCustomer, activeCustomer);
subscriptionRouter.get("/customer/id/:userid", getAllCustomerTables, getCustomerData);
subscriptionRouter.get("/customer/username/:username", getAllCustomerTables, getCustomerData);

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
