const loyaltyService = require("../services/loyaltyService");

const deleteLoyaltyRewardController = async (req, res, next) => {
  try {
    const { rewardId } = req.body;
    const response = await loyaltyService.deleteLoyaltyReward(rewardId);
    res.json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = deleteLoyaltyRewardController;
