const client = require("./squareClient");
const { paymentsApi, ordersApi } = client;
const { v4: uuidv4 } = require("uuid");
const logger = require("../config/winston");

const createPayment = async ({
  amount,
  sourceId,
  orderId,
  locationId,
  tip,
}) => {
  try {
    if (amount == 0) {
      console.log("PAYMENT IS ZERO");
      const payOrderResponse = ordersApi.payOrder(orderId, {
        idempotencyKey: uuidv4(),
      });
      return payOrderResponse;
    } else {
      const {
        result: { payment },
      } = await paymentsApi.createPayment({
        sourceId,
        locationId,
        orderId,
        idempotencyKey: uuidv4(),
        amountMoney: {
          amount,
          currency: "USD",
        },
        tipMoney: {
          amount: tip,
          currency: "USD",
        },
        appFeeMoney: {
          amount: 0,
          currency: "USD",
        },
      });
      logger.log({
        level: "info",
        message: "Payment successfullly created.",
        data: JSON.stringify(payment),
      });
      return payment;
    }
  } catch (error) {
    const errorToSend = error.errors ? error.errors[0].detail : error;
    throw new Error(`Payments API createPayment failed. ${errorToSend}`);
  }
};

module.exports = { createPayment };
