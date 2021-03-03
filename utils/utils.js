const PhoneNumber = require("awesome-phonenumber");

const phoneNumberIsValid = (phoneNumber) => {
  const number = new PhoneNumber(phoneNumber, "US");
  return number.isValid();
};

const getTimestamp = () => {
  return new Date().toLocaleString("en-US", { timeZone: "America/New_York" });
};

const filterByTag = (arr, ...tags) => {
  return arr
    .filter(
      (item) =>
        !item.tags ||
        !item.tags.length ||
        item.tags.some((tag) => !tags.includes(tag))
    )
    .map((item) => {
      if (item.choices) {
        return {
          ...item,
          choices: item.choices.filter(
            (choice) =>
              !choice.tags.length ||
              choice.tags.some((tag) => !tags.includes(tag))
          ),
        };
      } else return item;
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
