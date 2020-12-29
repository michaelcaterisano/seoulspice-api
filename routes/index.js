const express = require("express");
const router = express.Router();

// const getLoyaltyProgram = require("../controllers/getLoyaltyProgramController");
const addLoyaltyAccount = require("../controllers/addLoyaltyAccountController");
const createOrder = require("../controllers/createOrderController");
const createLoyaltyReward = require("../controllers/createLoyaltyRewardController");
const createPayment = require("../controllers/createPaymentController");

router.options("/", (req, res) => {
  res.status(204).send("ok");
});

router.post("/create-order", createOrder);

router.post("/add-loyalty-account", addLoyaltyAccount);

router.post("/create-loyalty-reward", createLoyaltyReward);

router.post("/create-payment", createPayment);

// router.post("accumulate-loyalty-point");
module.exports = router;
