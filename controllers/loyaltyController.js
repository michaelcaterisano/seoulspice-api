const loyaltyService = require("../services/loyaltyService");

const searchLoyaltyAccounts = async (req, res, next) => {
  try {
    const { type, value } = req.body;
    const loyaltyAccount = await loyaltyService.searchLoyaltyAccounts(
      type,
      value
    );
    return res.send(loyaltyAccount);
  } catch (error) {
    next(error);
  }
};

module.exports = searchLoyaltyAccounts;
