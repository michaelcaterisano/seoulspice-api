const client = require("./squareClient");
const { ordersApi } = client;
const OrderDiscount = require("../models/OrderDiscount");
const logger = require("../config/winston");

const createOrder = async (orderInfo) => {
  try {
    const {
      result: { order },
    } = await ordersApi.createOrder(orderInfo);
    const { id, netAmounts } = order;
    return order;
  } catch (error) {
    throw error;
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
    throw error;
  }
};

const retrieveOrder = async (orderId) => {
  try {
    const {
      result: { order },
    } = await ordersApi.retrieveOrder(orderId);
    return order;
  } catch (error) {
    throw error;
  }
};

const discountOrder = async ({ orderId, discount }) => {
  try {
    // retrieve order and get info
    const orderToUpdate = await retrieveOrder(orderId);
    const discountedOrder = new OrderDiscount({
      orderToUpdate,
      discount,
    }).getDiscountedOrder();
    // update order
    const {
      result: { order },
    } = await ordersApi.updateOrder(orderId, discountedOrder);
    const { id, netAmounts } = order;
    logger.log({
      level: "info",
      message: "Order successfully discounted",
      data: order,
    });
    return order;
  } catch (error) {
    throw error;
  }
};

module.exports = { createOrder, getOrderSummary, retrieveOrder, discountOrder };
