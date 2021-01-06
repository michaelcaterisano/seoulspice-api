const loyaltyService = require("../services/loyaltyService");
const orderService = require("../services/orderService");
const asyncHandler = require("express-async-handler");

const createLoyaltyReward = async (req, res, next) => {
  try {
    const { phoneNumber, orderId } = req.body;
    const reward = await loyaltyService.createLoyaltyReward(
      phoneNumber,
      orderId
    );
    const { totalMoney, discounts } = await orderService.retrieveOrder(orderId);
    res.json({
      success: true,
      rewardStatus: reward.status,
      updatedOrderTotal: totalMoney.amount,
      discount: discounts[0].appliedMoney.amount,
      rewardId: reward.id,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = createLoyaltyReward;
