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

const getOrderSummary = async (orderId) => {
  try {
    const {
      totalMoney,
      totalTaxMoney,
      totalDiscountMoney,
      totalTipMoney,
    } = await retrieveOrder(orderId);
    return { totalMoney, totalTaxMoney, totalDiscountMoney, totalTipMoney };
  } catch (error) {
    throw new Error(
      `Orders API Error: Failed to get order summary. Errors: ${error.message}`
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
      `Orders API Error: Failed to retrieve order. Errors: ${error.result.errors}`
    );
  }
};

module.exports = { createOrder, getOrderSummary, retrieveOrder };
