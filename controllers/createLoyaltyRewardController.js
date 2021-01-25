const loyaltyService = require("../services/loyaltyService");
const orderService = require("../services/orderService");

const createLoyaltyReward = async (req, res, next) => {
  try {
    const { phoneNumber, orderId } = req.body;
    const reward = await loyaltyService.createLoyaltyReward(
      phoneNumber,
      orderId
    );
    const { netAmounts } = await orderService.retrieveOrder(orderId);
    res.json({
      success: true,
      rewardStatus: reward.status,
      updatedOrderTotal: netAmounts.totalMoney.amount,
      discount: netAmounts.discountMoney.amount,
      rewardId: reward.id,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = createLoyaltyReward;
