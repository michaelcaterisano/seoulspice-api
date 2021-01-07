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
      locationId,
    });

    let points = 0;
    const { result } = await loyaltyService.accumulateLoyaltyPoints({
      phoneNumber,
      orderId,
      locationId,
    });

    // doing this because api returns {} if points are not accrued
    if (result.event) {
      points = result.event.accumulatePoints.points;
    }

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
