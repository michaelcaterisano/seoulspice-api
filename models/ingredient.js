const mongoose = require("mongoose");

const IngredientSchema = mongoose.Schema({
  name: { type: String, unique: true },
  outOfStockAt: [],
});

const Ingredient = mongoose.model("Ingredient", IngredientSchema);

module.exports = Ingredient;
