const express = require("express");
const router = express.Router();

// const getLoyaltyProgram = require("../controllers/getLoyaltyProgramController");
const addLoyaltyAccount = require("../controllers/addLoyaltyAccountController");
const createOrder = require("../controllers/createOrderController");

router.post("/create-order", createOrder);

router.post("/add-loyalty-account", addLoyaltyAccount);

// router.post("/redeem-loyalty-reward", redeemLoyaltyReward);

// router.post("/create-payment", )

// router.post("accumulate-loyalty-point");
module.exports = router;
