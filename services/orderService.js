const client = require("./squareClient");

const createOrder = async (order) => {
  try {
    const result = await client.ordersApi.createorder();
    return { success: true, body: result };
  } catch (error) {
    return { success: false, body: error };
  }
};

module.exports = { createOrder };
