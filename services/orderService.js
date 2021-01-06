const client = require("./squareClient");
const { ordersApi } = client;

const createOrder = async (orderInfo) => {
  try {
    const {
      result: { order },
    } = await ordersApi.createOrder(orderInfo);
    return order;
  } catch (error) {
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
