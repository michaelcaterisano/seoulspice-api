const locationService = require("../services/locationService");
const { Client } = require("@googlemaps/google-maps-services-js");
const googleClient = new Client({});

const locationController = async (req, res, next) => {
  try {
    const { postalCode } = req.query;

    const locations = await locationService.getLocations();

    const addresses = locations.map((location) => {
      const { address } = location;
      return `${address.addressLine1} ${address.locality} ${address.administrativeDistrictLevel1} ${address.postalCode}`;
    });

    const {
      data: { destination_addresses: destinations, rows },
    } = await googleClient.distancematrix({
      params: {
        origins: [postalCode],
        destinations: addresses,
        key: process.env.GOOGLE_API_KEY,
      },
    });

    const distances = rows[0].elements;

    const addressesWithDistance = destinations
      .map((destination, index) => {
        const { address, phoneNumber, id, name } = locations[index];
        return {
          address,
          phoneNumber,
          id,
          name,
          distance: distances[index].distance.value,
        };
      })
      .filter((destination) => destination.distance < 10000);
    res.send(addressesWithDistance);
  } catch (error) {
    next(error);
  }
};

module.exports = locationController;
