const client = require("./squareClient");
const { ordersApi } = client;
const chalk = require("chalk");

const createOrder = async (orderInfo) => {
  try {
    const {
      result: { order },
    } = await ordersApi.createOrder(orderInfo);
    return order;
  } catch (error) {
    throw new Error(
      `Orders API Error: Failed to create order. Message: ${error.message}`
    );
  }
};

const retrieveOrder = async (orderId) => {
  try {
    const {
      result: { order },
    } = await ordersApi.retrieveOrder(orderId);
    return order;
  } catch (error) {
    throw new Error(
      `Orders API Error: Failed to retrieve order. Message: ${error.message}`
    );
  }
};

module.exports = { createOrder, retrieveOrder };
