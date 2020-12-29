const paymentsService = require("../services/paymentsService");
const asyncHandler = require("express-async-handler");

const createPayment = asyncHandler(async (req, res) => {
  const { sourceId, amount, orderId } = req.body;
  const payment = await paymentsService.createPayment({
    amount,
    sourceId,
    orderId,
  });
  return res.json({
    success: true,
    payment,
  });
});

module.exports = createPayment;
