const orderService = require("../services/orderService");

const createOrder = async (req, res, next) => {
  console.log("create order called");
  try {
    const { body } = req;
    // const result = await orderService.createOrder();
    return res.send(body);
  } catch (error) {
    next(error);
  }
};

module.exports = createOrder;
