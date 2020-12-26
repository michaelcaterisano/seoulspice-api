const express = require("express");
const router = express.Router();

const searchLoyaltyAccount = require("../controllers/loyaltyController");
const createOrder = require("../controllers/createOrderController");

router.post("/search-loyalty-account", searchLoyaltyAccount);

router.post("/create-order", createOrder);

module.exports = router;
