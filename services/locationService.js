const logger = require("../config/winston");
const client = require("./squareClient");
const { locationsApi } = client;

const getLocations = async () => {
  try {
    const {
      result: { locations },
    } = await locationsApi.listLocations();
    return locations;
  } catch (error) {
    throw error;
  }
};

module.exports = { getLocations };
