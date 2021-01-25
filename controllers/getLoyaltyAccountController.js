const loyaltyService = require("../services/loyaltyService");

const getLoyaltyAccountController = async (req, res, next) => {
  try {
    const { phoneNumber } = req.body;
    const rewards = await loyaltyService.getAccountRewards(phoneNumber);
    const {
      hasReward,
      newAccount,
      accountBalance,
      name,
      percentageDiscount,
    } = rewards;

    res.json({
      success: true,
      hasReward,
      newAccount,
      accountBalance,
      name,
      percentageDiscount,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getLoyaltyAccountController;
