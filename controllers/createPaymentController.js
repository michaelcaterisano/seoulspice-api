const paymentsService = require("../services/paymentsService");
const orderService = require("../services/orderService");
const loyaltyService = require("../services/loyaltyService");
const asyncHandler = require("express-async-handler");

const createPaymentController = async (req, res, next) => {
  try {
    const {
      sourceId,
      amount,
      orderId,
      phoneNumber,
      locationId,
      tip,
    } = req.body;
    const payment = await paymentsService.createPayment({
      amount,
      sourceId,
      orderId,
      tip,
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
  } catch (error) {
    next(error);
  }
};

module.exports = createPaymentController;
