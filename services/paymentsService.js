const client = require("./squareClient");
const { paymentsApi } = client;
const { v4: uuidv4 } = require("uuid");

const chalk = require("chalk");

const createPayment = async ({ amount, sourceId, orderId }) => {
  try {
    const {
      result: { payment },
    } = await paymentsApi.createPayment({
      sourceId,
      idempotencyKey: uuidv4(),
      amountMoney: {
        amount,
        currency: "USD",
      },
      orderId,
    });
    return payment;
  } catch (error) {
    throw new Error(
      `Payments API Error: Failed to create payment. Errors: ${JSON.stringify(
        error.result.errors
      )}`
    );
  }
};

module.exports = { createPayment };
