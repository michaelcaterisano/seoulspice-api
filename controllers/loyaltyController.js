const loyaltyService = require("../services/loyaltyService");

const searchLoyaltyAccount = async (req, res) => {
  try {
    const { type, value } = req.body;
    const loyaltyAccount = await loyaltyService.search(type, value);
    return res.send(loyaltyAccount);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

module.exports = searchLoyaltyAccount;
