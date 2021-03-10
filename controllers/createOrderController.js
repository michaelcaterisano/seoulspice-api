const orderService = require("../services/orderService");
const OrderBuilder = require("../models/OrderBuilder");
const logger = require("../config/winston");

const createOrderController = async (req, res, next) => {
  try {
    const data = req.body;
    const orderData = new OrderBuilder(data).getOrder();
    const order = await orderService.createOrder(orderData);

    logger.log({
      level: "info",
      message: "Order successfully created",
      data: order,
      name: order.fulfillments[0].pickupDetails.recipient.displayName,
      email: order.fulfillments[0].pickupDetails.recipient.emailAddress,
      phoneNumber: data.phoneNumber,
    });

    return res.json({
      success: true,
      orderId: order.id,
      orderTotal: order.netAmounts.totalMoney.amount,
      orderTax: order.netAmounts.taxMoney.amount,
      orderTip: order.netAmounts.tipMoney.amount,
      orderDiscount: order.netAmounts.discountMoney.amount,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = createOrderController;
