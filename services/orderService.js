const client = require("./squareClient");
const { ordersApi } = client;
const OrderDiscount = require("../models/OrderDiscount");
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
    return { order };
  } catch (error) {
    const errorToSend = error.errors[0]
      ? JSON.stringify(error.errors[0])
      : error;
    throw new Error(`Orders API discountOrder failed. ${errorToSend}`);
  }
};

module.exports = { createOrder, getOrderSummary, retrieveOrder, discountOrder };
