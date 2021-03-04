const dbService = require("../services/dbService");

const dbGetIngredientsController = async (req, res, next) => {
  try {
    const ingredients = await dbService.getIngredients();
    res.send(ingredients);
  } catch (error) {
    next(error);
  }
};

module.exports = dbGetIngredientsController;
