const orderService = require("../services/orderService");
const discountCodes = require("../discountcodes");

const discountCodeController = async (req, res, next) => {
  try {
    const { orderId, discountCode } = req.body;
    const discount = discountCodes.find(
      (currCode) => currCode.code === discountCode
    );
    if (discount) {
      const { netAmounts } = await orderService.discountOrder({
        orderId,
        discount,
      });
      res.send({
        success: true,
        message: discount.message,
        orderTotal: netAmounts.totalMoney.amount,
        orderTax: netAmounts.taxMoney.amount,
        orderDiscount: netAmounts.discountMoney.amount,
      });
    } else {
      res.send({ success: false, message: `Invalid discount code` });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = discountCodeController;
