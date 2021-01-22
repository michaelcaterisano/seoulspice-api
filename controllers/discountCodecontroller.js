const orderService = require("../services/orderService");

const discountCodes = [
  {
    code: "SEOULSPICE10",
    name: "app launch promotion",
    type: "percentage",
    value: "10",
    message: "Order discounted 10%",
  },
];

const discountCodeController = async (req, res, next) => {
  try {
    const { orderId, discountCode } = req.body;
    const discount = discountCodes.find(
      (currCode) => currCode.code === discountCode
    );
    if (discount) {
      const result = await orderService.discountOrder({ orderId, discount });
      res.send({ success: true, message: discount.message, result });
    } else {
      res.send({ success: false, message: `Invalid discount code` });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = discountCodeController;
