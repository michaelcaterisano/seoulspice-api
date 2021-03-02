const PhoneNumber = require("awesome-phonenumber");

const phoneNumberIsValid = (phoneNumber) => {
  const number = new PhoneNumber(phoneNumber, "US");
  return number.isValid();
};

const getTimestamp = () => {
  return new Date().toLocaleString("en-US", { timeZone: "America/New_York" });
};

const filterByTag = (arr, ...tags) => {
  return arr.filter((item) => {
    if (item.choices) {
      item.choices = item.choices.filter(
        (choice) => !tags.some((tag) => choice.tags.includes(tag))
      );
      return item;
    } else {
      return !tags.some((tag) => item.tags.includes(tag));
    }
  });
};

const filterMenu = (menuData, outOfStock) => {
  let filteredMenu = {};
  Object.keys(menuData).forEach((key) => {
    filteredMenu[key] = filterByTag(menuData[key], ...outOfStock);
  });
  filteredMenu.getOption = function (type) {
    return this.options.find((option) => option.type === type);
  };
  return filteredMenu;
};

module.exports = { phoneNumberIsValid, getTimestamp, filterMenu };
