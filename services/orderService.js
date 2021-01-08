const client = require("./squareClient");
const { ordersApi } = client;
const logger = require("../config/winston");

const createOrder = async (orderInfo) => {
  try {
    const {
      result: { order },
    } = await ordersApi.createOrder(orderInfo);
    logger.log({
      level: "info",
      message: "Order successfully created",
      data: JSON.stringify(order),
    });
    return order;
  } catch (error) {
    logger.log({
      level: "error",
      message: "ordersApi.createOrder failed.",
      data: JSON.stringify(error),
    });
    throw new Error(`Orders API createOrder failed. ${error}`);
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
    throw new Error(`Orders Service getOrderSummary failed. ${error}`);
  }
};

const retrieveOrder = async (orderId) => {
  try {
    const {
      result: { order },
    } = await ordersApi.retrieveOrder(orderId);
    return order;
  } catch (error) {
    throw new Error(`Orders API retrieveOrder failed. ${error}`);
  }
};

module.exports = { createOrder, getOrderSummary, retrieveOrder };
