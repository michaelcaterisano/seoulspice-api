const express = require("express");
const router = express.Router();

const loyaltyService = require("../services/loyaltyService");

// const getLoyaltyProgram = require("../controllers/getLoyaltyProgramController");
const getLoyaltyAccountController = require("../controllers/getLoyaltyAccountController");
const createOrderController = require("../controllers/createOrderController");
const createLoyaltyRewardController = require("../controllers/createLoyaltyRewardController");
const createPaymentController = require("../controllers/createPaymentController");
const getOrderSummaryController = require("../controllers/getOrderSummaryController");
const getLocationsController = require("../controllers/getLocationsController");
// router.options("/*", (req, res) => {
//   res.status(204).send("ok");
// });

router.get("/", (req, res) => {
  res.send(`${process.env.NODE_ENV} API is running`);
});

router.post("/create-order", createOrderController);
router.post("/get-loyalty-account", getLoyaltyAccountController);
router.post("/create-loyalty-reward", createLoyaltyRewardController);
router.post("/create-payment", createPaymentController);
router.get("/order-summary", getOrderSummaryController);
router.get("/locations", getLocationsController);

module.exports = router;
