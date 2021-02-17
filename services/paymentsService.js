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
    // use pay order when amount and tip are $0
    if (amount == 0 && tip == 0) {
      const {
        result: { order },
      } = await ordersApi.payOrder(orderId, {
        idempotencyKey: uuidv4(),
      });
      const { id, netAmounts } = order;
      logger.log({
        level: "info",
        message: "PayOrder success, FREE ORDER: ",
        data: JSON.stringify({
          orderId: id,
          orderTotal: netAmounts.totalMoney.amount,
          orderTax: netAmounts.taxMoney.amount,
          orderTip: netAmounts.tipMoney.amount,
          orderDiscount: netAmounts.discountMoney.amount,
        }),
      });
      return order;
      // use createpayment for other orders
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
        data: JSON.stringify({
          id: payment.id,
          status: payment.status,
          amount: payment.amountMoney.amount,
          receiptUrl: payment.receiptUrl,
        }),
      });
      return payment;
    }
  } catch (error) {
    const errorToSend = error.errors ? error.errors[0].detail : error;
    throw new Error(`Payments API createPayment failed. ${errorToSend}`);
  }
};

module.exports = { createPayment };
