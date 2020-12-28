const orderService = require("../services/orderService");
const OrderBuilder = require("../models/OrderBuilder");
const asyncHandler = require("express-async-handler");

const createOrder = asyncHandler(async (req, res, next) => {
  const data = req.body;
  const order = new OrderBuilder(data).getOrder();
  const response = await orderService.createOrder(order);
  const { id, totalMoney } = response.result.order;
  return res.json({
    success: true,
    orderId: id,
    orderTotal: totalMoney.amount,
    order: response.result.order,
  });
});

module.exports = createOrder;
