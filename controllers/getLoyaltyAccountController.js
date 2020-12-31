const loyaltyService = require("../services/loyaltyService");
const asyncHandler = require("express-async-handler");
const chalk = require("chalk");

const getLoyaltyAccountController = asyncHandler(async (req, res) => {
  const { phoneNumber } = req.body;
  const {
    hasReward,
    accountBalance,
    name,
    percentageDiscount,
  } = await loyaltyService.getAccountRewards(phoneNumber);
  res.json({
    success: true,
    hasReward,
    accountBalance,
    name,
    percentageDiscount,
  });
});

module.exports = getLoyaltyAccountController;
