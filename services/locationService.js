const client = require("./squareClient");
const { locationsApi } = client;
const chalk = require("chalk");
const getLocations = async () => {
  try {
    const {
      result: { locations },
    } = await locationsApi.listLocations();

    const locationData = locations.reduce((acc, curr) => {
      const { id, name, address } = curr;
      acc.push({ id, name, address });
      return acc;
    }, []);

    return locationData;
  } catch (error) {
    throw new Error(
      `Locations API error. Failed to list locations. Message: ${JSON.stringify(
        error,
        null,
        2
      )}`
    );
  }
};

module.exports = { getLocations };
