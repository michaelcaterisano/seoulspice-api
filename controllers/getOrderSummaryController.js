const orderService = require("../services/orderService");
const asyncHandler = require("express-async-handler");
const chalk = require("chalk");

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
