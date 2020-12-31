const paymentsService = require("../services/paymentsService");
const orderService = require("../services/orderService");
const loyaltyService = require("../services/loyaltyService");
const asyncHandler = require("express-async-handler");

const createPaymentController = asyncHandler(async (req, res) => {
  const { sourceId, amount, orderId, phoneNumber } = req.body;
  const payment = await paymentsService.createPayment({
    amount,
    sourceId,
    orderId,
  });

  // const { rewards, locationId } = await orderService.retrieveOrder(orderId);
  // if (rewards) {
  //   const rewardId = rewards[0].id;
  //   console.log(rewardId);
  //   const redeemedReward = await loyaltyService.redeemLoyaltyReward(
  //     rewardId,
  //     locationId
  //   );
  // }

  // accumulate award point
  // const response = await loyaltyService.accumulateLoyaltyPoint(
  //   phoneNumber,
  //   orderId,
  //   locationId
  // );

  return res.json({
    success: true,
    status: payment.status,
    payment,
  });
});

module.exports = createPaymentController;
