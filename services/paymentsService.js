const client = require("./squareClient");
const { paymentsApi } = client;
const { v4: uuidv4 } = require("uuid");

const createPayment = async ({
  amount,
  sourceId,
  orderId,
  locationId,
  tip,
}) => {
  try {
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
    return payment;
  } catch (error) {
    console.log(error);
    throw new Error(`Payments API createPayment failed. Error: ${error}`);
  }
};

module.exports = { createPayment };
