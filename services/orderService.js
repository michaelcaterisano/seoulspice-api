const client = require("./squareClient");
const chalk = require("chalk");

const createOrder = async (order) => {
  try {
    const result = await client.ordersApi.createOrder(order);
    return result;
  } catch (error) {
    throw new Error(chalk.red(JSON.stringify(error, null, 2)));
  }
};

module.exports = { createOrder };
