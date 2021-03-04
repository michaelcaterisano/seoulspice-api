const mongoose = require("mongoose");
const url = process.env.MONGODB_URL;
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});
const ingredientModel = require("../models/ingredient");
const locationModel = require("../models/location");

const addIngredient = async (data) => {
  const ingredient = new ingredientModel(data);
  try {
    await ingredient.save();
    return ingredient;
  } catch (error) {
    throw error;
  }
};

const addLocation = async (data) => {
  const location = new locationModel(data);
  try {
    await location.save();
    return location;
  } catch (error) {
    throw error;
  }
};

const getIngredients = async () => {
  try {
    const ingredients = await ingredientModel.find({});
    return ingredients;
  } catch (error) {
    throw error;
  }
};

const getLocations = async () => {
  try {
    const locations = await locationModel.find({});
    return locations;
  } catch (error) {
    throw error;
  }
};

const getOutOfStockAtLocation = async (locationId) => {
  try {
    const ingredients = await getIngredients();
    const location = await locationModel
      .findOne({ squareId: locationId })
      .exec();

    const outOfStock = ingredients
      .filter((ingredient) => ingredient.outOfStockAt.includes(location._id))
      .map((ingredient) => ingredient.name);

    return outOfStock;
  } catch (error) {
    throw error;
  }
};

const setIngredientsOutOfStock = async ({ ingredients, locationId }) => {
  try {
    const results = await Promise.all(
      ingredients.map(async (ingredient) => {
        if (ingredient.outOfStock) {
          await ingredientModel.findOneAndUpdate(
            { name: ingredient.name },
            { $addToSet: { outOfStockAt: locationId } }
          );
        } else {
          await ingredientModel.findOneAndUpdate(
            { name: ingredient.name },
            { $pull: { outOfStockAt: locationId } }
          );
        }
        return ingredient;
      })
    );
    return results;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addIngredient,
  addLocation,
  getIngredients,
  getLocations,
  setIngredientsOutOfStock,
  getOutOfStockAtLocation,
};
