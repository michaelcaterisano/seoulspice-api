const paymentsService = require("../services/paymentsService");
const orderService = require("../services/orderService");
const loyaltyService = require("../services/loyaltyService");
const asyncHandler = require("express-async-handler");

const createPaymentController = asyncHandler(async (req, res) => {
  const { sourceId, amount, orderId, phoneNumber, locationId } = req.body;
  const payment = await paymentsService.createPayment({
    amount,
    sourceId,
    orderId,
  });

  const {
    result: {
      event: {
        accumulatePoints: { points },
      },
    },
  } = await loyaltyService.accumulateLoyaltyPoints({
    phoneNumber,
    orderId,
    locationId,
  });

  return res.json({
    success: true,
    status: payment.status,
    amount: payment.amountMoney.amount,
    accumulatedLoyaltyPoints: points,
  });
});

module.exports = createPaymentController;
