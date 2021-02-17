const client = require("twilio")(
  process.env.TWILIO_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const textCustomerReceipt = ({ phoneNumber, receiptUrl }) => {
  const message = receiptUrl
    ? `Thank you for ordering from Seoulspice! Here's the receipt for your order: ${receiptUrl}`
    : `Thanks for ordering from Seoulspice! Your order will be ready soon.`;
  client.messages
    .create({
      body: message,
      messagingServiceSid: process.env.TWILIO_MSG_SERVICE_ID,
      to: `${phoneNumber}`,
    })
    .then((message) => {
      return message;
    })
    .catch((error) => {
      throw new Error(`Text customer receipt error: ${error}`);
    })
    .done();
};

module.exports = { textCustomerReceipt };
