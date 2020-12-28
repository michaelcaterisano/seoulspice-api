const client = require("./squareClient");
const { ordersApi } = client;
const chalk = require("chalk");

const createOrder = async (order) => {
  try {
    const result = await ordersApi.createOrder(order);
    return result;
  } catch (error) {
    throw new Error(
      `Orders API Error: Failed to create order. Message: ${error.message}`
    );
  }
};

// const retrieveOrder = async (orderId) => {
//   try {
//     const { result: }
//   } catch {}
// };

module.exports = { createOrder };
