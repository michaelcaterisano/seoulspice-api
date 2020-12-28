const orderService = require("../services/orderService");
const OrderBuilder = require("../models/OrderBuilder");
const chalk = require("chalk");

const createOrder = async (req, res, next) => {
  try {
    const data = req.body;
    const order = new OrderBuilder(data).getOrder();
    const response = await orderService.createOrder(order, next);
    const { id, totalMoney } = response.result.order;
    return res.send({ orderId: id, orderTotal: totalMoney.amount });
  } catch (error) {
    next(error);
  }
};

module.exports = createOrder;
