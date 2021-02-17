const paymentsService = require("../services/paymentsService");

const createPaymentController = async (req, res, next) => {
  try {
    const { sourceId, amount, orderId, locationId, tip } = req.body;
    const response = await paymentsService.createPayment({
      amount,
      sourceId,
      orderId,
      tip,
      locationId,
    });

    if (amount == 0 && tip == 0) {
      return res.json({
        success: true,
        status: response.state,
        amount: response.totalMoney.amount,
        receiptUrl: null,
      });
    } else {
      return res.json({
        success: true,
        status: response.status,
        amount: response.amountMoney.amount,
        receiptUrl: response.receiptUrl,
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = createPaymentController;
