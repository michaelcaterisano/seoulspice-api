const client = require("./squareClient");
const { locationsApi } = client;

const getAdditionalLocationInformation = (location) => {
  let url, taxRate, locationName, locationCity;
  switch (location.name.toLowerCase()) {
    case "dc noma":
      url = `https://res.cloudinary.com/seoulspice/image/upload/c_scale,w_300,f_auto,q_auto/seoulspice/locations/noma_r4ry5w.jpg`;
      taxRate = 10;
      locationName = "Noma";
      locationCity = "Washington, DC";
      break;
    case "dc tenleytown":
      url = `https://res.cloudinary.com/seoulspice/image/upload/c_scale,w_300,f_auto,q_auto/seoulspice/locations/tenley_c3qjoq.jpg`;
      taxRate = 10;
      locationName = "Tenleytown";
      locationCity = "Washington, DC";
      break;
    case "md college park":
      url = `https://res.cloudinary.com/seoulspice/image/upload/c_scale,w_300,f_auto,q_auto/seoulspice/locations/umd_i06l2i.jpg`;
      taxRate = 6;
      locationName = "Terrapin Row";
      locationCity = "College Park, MD";
      break;
    case "md westfield moco":
      url = `https://res.cloudinary.com/seoulspice/image/upload/c_scale,w_300,f_auto,q_auto/seoulspice/locations/noma_r4ry5w.jpg`;
      taxRate = 6;
      locationName = "Moco - Westfield Mall";
      locationCity = "Bethesda, MD";
      break;
    default:
      url = `https://res.cloudinary.com/seoulspice/image/upload/c_scale,w_300,f_auto,q_auto/seoulspice/locations/noma_r4ry5w.jpg`;
      taxRate = 6;
      locationName = "Seoulspice";
      locationCity = "Washington, DC";
  }
  return { url, taxRate, locationName, locationCity };
};

const getLocations = async () => {
  try {
    const {
      result: { locations },
    } = await locationsApi.listLocations();

    locations.map((location) => {
      const additionalInformation = getAdditionalLocationInformation(location);
      Object.assign(location, additionalInformation);
    });

    const formattedLocations = locations.map((location) => {
      const {
        id,
        name,
        address,
        imageUrl,
        taxRate,
        locationName,
        locationCity,
      } = location;
      return {
        id,
        name,
        address,
        imageUrl,
        taxRate,
        locationName,
        locationCity,
      };
    });
    return formattedLocations;
  } catch (error) {
    throw error;
  }
};

module.exports = { getLocations };
