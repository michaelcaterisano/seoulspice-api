const paymentsService = require("../services/paymentsService");

const createPaymentController = async (req, res, next) => {
  try {
    const { sourceId, amount, orderId, locationId, tip } = req.body;
    const payment = await paymentsService.createPayment({
      amount,
      sourceId,
      orderId,
      tip,
      locationId,
    });

    return res.json({
      success: true,
      status: payment.status,
      amount: payment.amountMoney.amount,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = createPaymentController;
