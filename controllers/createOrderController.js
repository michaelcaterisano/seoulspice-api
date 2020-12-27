const orderService = require("../services/orderService");
const OrderBuilder = require("../models/OrderBuilder");

const createOrder = async (req, res, next) => {
  try {
    const data = req.body;
    const order = new OrderBuilder(data).getOrder();
    return res.send(order);
  } catch (error) {
    next(error);
  }
};

module.exports = createOrder;
