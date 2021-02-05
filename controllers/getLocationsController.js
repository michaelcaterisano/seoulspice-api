const locationService = require("../services/locationService");
const { Client } = require("@googlemaps/google-maps-services-js");
const googleClient = new Client({});

const locationController = async (req, res, next) => {
  try {
    // get user input
    const { latitude, longitude, userAddress } = req.body;
    const userPosition = userAddress ? userAddress : `${latitude},${longitude}`;

    // get locations
    const locations = await locationService.getLocations();
    const addresses = locations.map((location) => {
      const { address } = location;
      return `${address.addressLine1} ${address.locality} ${address.administrativeDistrictLevel1} ${address.postalCode}`;
    });

    // get distances
    const {
      data: { rows },
    } = await googleClient.distancematrix({
      params: {
        units: "imperial",
        origins: [userPosition],
        destinations: addresses,
        key: process.env.GOOGLE_API_KEY,
      },
    });
    const distances = rows[0].elements;

    // add distances to locations
    const locationsWithDistance = locations
      .map((location, index) => {
        location.distance = distances[index].distance.value;
        location.distanceText = distances[index].distance.text;
        return location;
      })
      .sort((a, b) => a.distance - b.distance);

    res.send({ success: true, locations: locationsWithDistance });
  } catch (error) {
    next(error);
  }
};

module.exports = locationController;
