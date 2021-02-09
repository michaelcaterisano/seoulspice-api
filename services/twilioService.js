const client = require("twilio")(
  process.env.TWILIO_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const textCustomerReceipt = ({ phoneNumber, receiptUrl }) => {
  client.messages
    .create({
      body: `Thank you for ordering from Seoulspice Pickup! Here's the receipt for your order: ${receiptUrl}`,
      messagingServiceSid: process.env.TWILIO_MSG_SERVICE_ID,
      to: `+1${phoneNumber}`,
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
