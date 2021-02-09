const twilioService = require("../services/twilioService");

const sendReceiptController = async (req, res, next) => {
  try {
    const { phoneNumber, receiptUrl } = req.body;
    const response = await twilioService.textCustomerReceipt({
      phoneNumber,
      receiptUrl,
    });
    res.send({ response });
  } catch (error) {
    next(error);
  }
};

module.exports = sendReceiptController;
