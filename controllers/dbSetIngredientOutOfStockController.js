const dbService = require("../services/dbService");

const dbSetIngredientsOutOfStockController = async (req, res, next) => {
  try {
    const { ingredients, locationId } = req.body;
    const updatedIngredients = await dbService.setIngredientsOutOfStock({
      ingredients,
      locationId,
    });
    res.send(updatedIngredients);
  } catch (error) {
    next(error);
  }
};

module.exports = dbSetIngredientsOutOfStockController;
