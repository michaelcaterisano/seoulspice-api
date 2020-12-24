const express = require("express");
const router = express.Router();

router.use("/search-loyalty-account", require("./searchLoyaltyAccount"));

module.exports = router;
