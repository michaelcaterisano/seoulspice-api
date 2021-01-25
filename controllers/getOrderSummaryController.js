const orderService = require("../services/orderService");

const getOrderSummaryController = async (req, res, next) => {
  try {
    const { orderId } = req.query;
    const result = await orderService.getOrderSummary(orderId);
    res.json({ success: true, totals: result });
  } catch (error) {
    next(error);
  }
};

module.exports = getOrderSummaryController;
