const mongoose = require("mongoose");
const url = process.env.MONGODB_URL;
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
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

// const getIngredient = async (ingredientId) => {
//   try {
//     const ingredient = ingredientModel.find({ _id: ingredientId });
//     return ingredient;
//   } catch (error) {
//     throw error;
//   }
// };

const getLocationIngredients = async (location) => {
  try {
    const ingredients = ingredientModel.find({});
    return ingredients;
  } catch (error) {
    throw error;
  }
};

const setIngredientOutOfStock = async (ingredientName, locationId) => {
  try {
    const ingredient = await ingredientModel.findOneAndUpdate(
      { name: ingredientName },
      { $addToSet: { locations: locationId } }
    );
    return ingredient;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addIngredient,
  addLocation,
  getLocationIngredients,
  setIngredientOutOfStock,
};
