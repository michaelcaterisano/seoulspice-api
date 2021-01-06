const client = require("./squareClient");
const { locationsApi } = client;

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

    return locations;
  } catch (error) {
    throw error;
  }
};

module.exports = { getLocations };
