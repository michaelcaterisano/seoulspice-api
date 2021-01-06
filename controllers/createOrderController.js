const orderService = require("../services/orderService");
const OrderBuilder = require("../models/OrderBuilder");
const asyncHandler = require("express-async-handler");

const createOrderController = async (req, res, next) => {
  try {
    const data = req.body;
    const order = new OrderBuilder(data).getOrder();
    const { id, totalMoney } = await orderService.createOrder(order);

    return res.json({
      success: true,
      orderId: id,
      orderTotal: totalMoney.amount,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = createOrderController;
