const logger = require("../config/winston");
const client = require("./squareClient");
const { locationsApi } = client;

const getLocationImageUrl = (location) => {
  let url;
  switch (location.name.toLowerCase()) {
    case "dc noma":
      url = `https://res.cloudinary.com/seoulspice/image/upload/c_scale,w_300,f_auto,q_auto/seoulspice/locations/noma_r4ry5w.jpg`;
      break;
    case "dc tenleytown":
      url = `https://res.cloudinary.com/seoulspice/image/upload/c_scale,w_300,f_auto,q_auto/seoulspice/locations/tenley_c3qjoq.jpg`;
      break;
    case "md college park":
      url = `https://res.cloudinary.com/seoulspice/image/upload/c_scale,w_300,f_auto,q_auto/seoulspice/locations/umd_i06l2i.jpg`;
      break;
    default:
      url = `https://res.cloudinary.com/seoulspice/image/upload/c_scale,w_300,f_auto,q_auto/seoulspice/locations/noma_r4ry5w.jpg`;
  }
  return url;
};

const getLocations = async () => {
  try {
    const {
      result: { locations },
    } = await locationsApi.listLocations();

    locations.map((location) => {
      location.imageUrl = getLocationImageUrl(location);
    });

    const formattedLocations = locations.map((location) => {
      const { id, name, address, imageUrl } = location;
      return { id, name, address, imageUrl };
    });
    return formattedLocations;
  } catch (error) {
    throw error;
  }
};

module.exports = { getLocations };
