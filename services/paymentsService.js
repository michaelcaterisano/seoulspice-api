const client = require("./squareClient");
const { paymentsApi } = client;
const { v4: uuidv4 } = require("uuid");

const createPayment = async ({ amount, sourceId, orderId, tip }) => {
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
      tipMoney: {
        amount: tip,
        currency: "USD",
      },
      orderId,
    });
    return payment;
  } catch (error) {
    console.log(error);
    throw new Error(
      `Payments API createPayment failed. Error: ${error.errors[0].detail}`
    );
  }
};

module.exports = { createPayment };
