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
    const result = await orderService.retrieveOrder(orderId);
    res.json({
      success: true,
      rewardStatus: reward.status,
      updatedOrderTotal: result.totalMoney.amount,
      discount: result.discounts ? result.discounts[0].appliedMoney.amount : 0,
      rewardId: reward.id,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = createLoyaltyReward;
