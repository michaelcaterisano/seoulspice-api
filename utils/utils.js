const PhoneNumber = require("awesome-phonenumber");

const phoneNumberIsValid = (phoneNumber) => {
  const number = new PhoneNumber(phoneNumber, "US");
  return number.isValid();
};

module.exports = { phoneNumberIsValid };
