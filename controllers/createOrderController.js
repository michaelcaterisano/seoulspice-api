const orderService = require("../services/orderService");
const OrderBuilder = require("../models/OrderBuilder");
const asyncHandler = require("express-async-handler");

const createOrder = asyncHandler(async (req, res, next) => {
  const data = req.body;
  const order = new OrderBuilder(data).getOrder();
  const { id, totalMoney } = await orderService.createOrder(order);
  return res.json({
    success: true,
    orderId: id,
    orderTotal: totalMoney.amount,
  });
});

module.exports = createOrder;
