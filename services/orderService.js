const client = require("./squareClient");
const chalk = require("chalk");

const createOrder = async (order, next) => {
  try {
    const result = await client.ordersApi.createOrder(order);
    return result;
  } catch (error) {
    next(error);
  }
};

module.exports = { createOrder };
