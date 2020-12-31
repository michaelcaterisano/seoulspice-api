const express = require("express");
const router = express.Router();

// const getLoyaltyProgram = require("../controllers/getLoyaltyProgramController");
const getLoyaltyAccountController = require("../controllers/getLoyaltyAccountController");
const createOrderController = require("../controllers/createOrderController");
const createLoyaltyRewardController = require("../controllers/createLoyaltyRewardController");
const createPaymentController = require("../controllers/createPaymentController");

// router.options("/*", (req, res) => {
//   res.status(204).send("ok");
// });

router.get("/", (req, res) => {
  res.send(`${process.env.NODE_ENV} API is running`);
});

router.post("/create-order", createOrderController);

router.post("/get-loyalty-account", getLoyaltyAccountController);
router.post("/create-loyalty-reward", createLoyaltyRewardController);
// router.post("/redeem-loyalty-reward", redeemLoyaltyReward);
// router.post("delete-loyalty-reward", deleteLoyaltyReward);
// router.post("accumulate-loyalty-point");

router.post("/create-payment", createPaymentController);

module.exports = router;
