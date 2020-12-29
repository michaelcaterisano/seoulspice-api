const loyaltyService = require("../services/loyaltyService");
const asyncHandler = require("express-async-handler");
const chalk = require("chalk");

const createLoyaltyReward = asyncHandler(async (req, res, next) => {
  const { phoneNumber, orderId, locationId } = req.body;
  const loyaltyAccount = await loyaltyService.getAccount(phoneNumber);
  console.log(chalk.yellow(JSON.stringify(loyaltyAccount)));
  const reward = await loyaltyService.getReward(loyaltyAccount);
  console.log(chalk.blue(JSON.stringify(reward)));
  const response = await loyaltyService.createLoyaltyReward(
    loyaltyAccount.id,
    orderId,
    locationId,
    reward.rewardTierId
  );
  res.send(response);
});

module.exports = createLoyaltyReward;
