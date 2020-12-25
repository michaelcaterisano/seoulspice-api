const loyaltyService = require("../services/loyaltyService");

const searchLoyaltyAccount = async (req, res, next) => {
  try {
    const { type, value } = req.body;
    const loyaltyAccount = await loyaltyService.search(type, value);
    return res.send(loyaltyAccount);
  } catch (error) {
    next(error);
  }
};

module.exports = searchLoyaltyAccount;
