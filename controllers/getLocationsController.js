const locationService = require("../services/locationService");

const locationController = async (req, res, next) => {
  try {
    const locations = await locationService.getLocations();
    res.send(locations);
  } catch (error) {
    next(error);
  }
};

module.exports = locationController;
