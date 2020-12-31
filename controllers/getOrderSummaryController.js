const orderService = require("../services/orderService");
const asyncHandler = require("express-async-handler");
const chalk = require("chalk");

const getOrderSummaryController = asyncHandler(async (req, res) => {
  const { orderId } = req.query;
  const result = await orderService.getOrderSummary(orderId);
  res.json({ success: true, totals: result });
});

module.exports = getOrderSummaryController;
