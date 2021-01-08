const logger = require("../config/winston");
const client = require("./squareClient");
const { locationsApi } = client;

const getLocations = async () => {
  try {
    const {
      result: { locations },
    } = await locationsApi.listLocations();

    // const locationData = locations.reduce((acc, curr) => {
    //   const { id, name, address } = curr;
    //   acc.push({ id, name, address });
    //   return acc;
    // }, []);
    logger.log({
      level: "info",
      message: "some locations",
      data: JSON.stringify(locations),
    });
    return locations;
  } catch (error) {
    throw error;
  }
};

module.exports = { getLocations };
