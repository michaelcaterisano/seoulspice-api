const loyaltyService = require("../services/loyaltyService");
const orderService = require("../services/orderService");
const asyncHandler = require("express-async-handler");
const chalk = require("chalk");

const createLoyaltyReward = asyncHandler(async (req, res, next) => {
  const { phoneNumber, orderId, locationId } = req.body;

  const loyaltyAccount = await loyaltyService.getAccount(phoneNumber);

  const { rewardTierId } = await loyaltyService.getReward(loyaltyAccount);

  const { reward } = await loyaltyService.createLoyaltyReward(
    loyaltyAccount.id,
    orderId,
    locationId,
    rewardTierId
  );

  const { totalMoney, discounts } = await orderService.retrieveOrder(orderId);

  res.send({
    rewardId: reward.id,
    orderId,
    updatedOrderTotal: totalMoney.amount,
    discount: discounts[0].appliedMoney.amount,
    remainingBalance: loyaltyAccount.balance,
  });
});

module.exports = createLoyaltyReward;
