const loyaltyService = require("../services/loyaltyService");
const asyncHandler = require("express-async-handler");
const chalk = require("chalk");

const addLoyaltyAccount = asyncHandler(async (req, res) => {
  const { phoneNumber } = req.body;
  const loyaltyAccount = await loyaltyService.getAccount(phoneNumber);
  if (loyaltyAccount) {
    const reward = await loyaltyService.getReward(loyaltyAccount);
    res.json({ accountFound: true, reward });
  } else {
    await loyaltyService.createAccount(phoneNumber);
    res.json({
      accountFound: false,
    });
  }
});

module.exports = addLoyaltyAccount;
