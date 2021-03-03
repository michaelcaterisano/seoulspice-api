const PhoneNumber = require("awesome-phonenumber");

const phoneNumberIsValid = (phoneNumber) => {
  const number = new PhoneNumber(phoneNumber, "US");
  return number.isValid();
};

const getTimestamp = () => {
  return new Date().toLocaleString("en-US", { timeZone: "America/New_York" });
};

const filterByTag = (arr, ...tags) => {
  if (!tags.length) {
    return arr;
  }
  return arr.filter((item) => {
    if (item.choices) {
      item.choices = item.choices.filter((choice) =>
        choice.tags.length
          ? choice.tags.some((tag) => !tags.includes(tag))
            ? choice
            : null
          : choice
      );
      return item;
    } else {
      return item.tags.length
        ? item.tags.some((tag) => !tags.includes(tag))
          ? item
          : null
        : item;
    }
  });
};

const filterMenu = (menuData, outOfStock) => {
  let filteredMenu = {};
  Object.keys(menuData).forEach((key) => {
    filteredMenu[key] = filterByTag(menuData[key], ...outOfStock);
  });
  return filteredMenu;
};

module.exports = { phoneNumberIsValid, getTimestamp, filterMenu };
