const orderService = require("../services/orderService");
const OrderBuilder = require("../models/OrderBuilder");

const createOrderController = async (req, res, next) => {
  try {
    const data = req.body;
    const order = new OrderBuilder(data).getOrder();
    const { id, netAmounts } = await orderService.createOrder(order);

    return res.json({
      success: true,
      orderId: id,
      orderTotal: netAmounts.totalMoney.amount,
      orderTax: netAmounts.taxMoney.amount,
      orderTip: netAmounts.tipMoney.amount,
      orderDiscount: netAmounts.discountMoney.amount,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = createOrderController;
