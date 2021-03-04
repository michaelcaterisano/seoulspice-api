const dbService = require("../services/dbService");

const getLocationIngredients = async (req, res, next) => {
  try {
    const ingredients = await dbService.getLocationIngredients();
    res.send(ingredients);
  } catch (error) {
    next(error);
  }
};

module.exports = getLocationIngredients;
