const express = require("express");
const router = express.Router();

const searchLoyaltyAccount = require("../controllers/loyaltyController");

router.post("/search-loyalty-account", searchLoyaltyAccount);

module.exports = router;
