const locationService = require("../services/locationService");
const { Client } = require("@googlemaps/google-maps-services-js");
const googleClient = new Client({});

const locationController = async (req, res, next) => {
  try {
    const { latitude, longitude, userAddress } = req.body;
    const userPosition = userAddress ? userAddress : `${latitude},${longitude}`;

    const locations = await locationService.getLocations();
    const addresses = locations.map((location) => {
      const { address } = location;
      return `${address.addressLine1} ${address.locality} ${address.administrativeDistrictLevel1} ${address.postalCode}`;
    });

    const {
      data: { destination_addresses: destinations, rows },
    } = await googleClient.distancematrix({
      params: {
        units: "imperial",
        origins: [userPosition],
        destinations: addresses,
        key: process.env.GOOGLE_API_KEY,
      },
    });

    const distances = rows[0].elements;

    const addressesWithDistance = locations
      .map((locations, index) => {
        const { address, phoneNumber, id, name } = locations;
        return {
          address,
          phoneNumber,
          id,
          name,
          distance: distances[index].distance.value,
          distanceText: distances[index].distance.text,
        };
      })
      .sort((a, b) => a.distance - b.distance);
    // .filter((destination) => destination.distance < 10000);
    res.send(addressesWithDistance);
  } catch (error) {
    next(error);
  }
};

module.exports = locationController;
