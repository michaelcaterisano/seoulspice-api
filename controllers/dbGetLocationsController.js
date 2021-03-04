const dbService = require("../services/dbService");

const dbGetLocationsController = async (req, res, next) => {
  try {
    const locations = await dbService.getLocations();
    res.send(locations);
  } catch (error) {
    next(error);
  }
};

module.exports = dbGetLocationsController;
