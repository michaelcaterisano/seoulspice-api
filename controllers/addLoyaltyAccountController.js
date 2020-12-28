const loyaltyService = require("../services/loyaltyService");
const chalk = require("chalk");

const getLoyaltyRewards = async (req, res, next) => {
  const { phoneNumber } = req.body;
  try {
    // look up loyalty account
    let loyaltyAccount = await loyaltyService.getAccount(phoneNumber);
    // if account found, look up available rewards
    if (loyaltyAccount) {
      const rewards = await loyaltyService.getRewards(loyaltyAccount);
    } else {
      // if no account is found, create new loyalty account
      loyaltyAccount = await loyaltyService.createAccount(phoneNumber);
    }
    // return reward
  } catch (error) {
    next(error);
  }
};

module.exports = getLoyaltyRewards;
