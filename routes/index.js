const express = require("express");
const router = express.Router();

router.use("/create-loyalty-account", require("./createLoyaltyAccount"));

module.exports = router;
