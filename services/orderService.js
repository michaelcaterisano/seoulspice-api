const client = require("./squareClient");
const { ordersApi } = client;
const OrderDiscount = require("../models/OrderDiscount");
const logger = require("../config/winston");
const chalk = require("chalk");

const createOrder = async (orderInfo) => {
  try {
    const {
      result: { order },
    } = await ordersApi.createOrder(orderInfo);
    const { id, netAmounts } = order;
    logger.log({
      level: "info",
      message: "Order successfully created: ",
      data: JSON.stringify({
        orderId: id,
        orderTotal: netAmounts.totalMoney.amount,
        orderTax: netAmounts.taxMoney.amount,
        orderTip: netAmounts.tipMoney.amount,
        orderDiscount: netAmounts.discountMoney.amount,
      }),
    });
    return order;
  } catch (error) {
    throw new Error(`Orders API createOrder failed. ${JSON.stringify(error)}`);
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
      `Orders Service getOrderSummary failed. ${JSON.stringify(error)}`
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
      `Orders API retrieveOrder failed. ${JSON.stringify(error)}`
    );
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
      data: JSON.stringify({
        orderId: id,
        orderTotal: netAmounts.totalMoney.amount,
        orderTax: netAmounts.taxMoney.amount,
        orderTip: netAmounts.tipMoney.amount,
        orderDiscount: netAmounts.discountMoney.amount,
      }),
    });
    return order;
  } catch (error) {
    throw new Error(
      `Orders API discountOrder failed. ${JSON.stringify(error)}`
    );
  }
};

module.exports = { createOrder, getOrderSummary, retrieveOrder, discountOrder };
