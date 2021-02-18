const PhoneNumber = require("awesome-phonenumber");

const phoneNumberIsValid = (phoneNumber) => {
  const number = new PhoneNumber(phoneNumber, "US");
  return number.isValid();
};

const getTimestamp = () => {
  return new Date().toLocaleString("en-US", { timeZone: "America/New_York" });
};

module.exports = { phoneNumberIsValid, getTimestamp };
