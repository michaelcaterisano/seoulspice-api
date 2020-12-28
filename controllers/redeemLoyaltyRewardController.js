const loyaltyService = require("../services/loyaltyService");
const chalk = require("chalk");

const redeemLoyaltyReward = async (req, res, next) => {
  const { orderId, locationId, phoneNumber, rewardTierId } = req.body;
  try {
    const reward = await loyaltyService.createLoyaltyReward({
      reward: {
        orderId,
        loyaltyAccountId,
        rewardTierId,
      },
      idempotencyKey,
    });

    // return reward
  } catch (error) {
    next(error);
  }
};

module.exports = redeemLoyaltyReward;
