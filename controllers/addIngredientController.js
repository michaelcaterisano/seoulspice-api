const dbService = require("../services/dbService");

const addIngredient = async (req, res, next) => {
  try {
    console.log(req.body);
    const ingredient = await dbService.addIngredient(req.body);
    res.send(ingredient);
  } catch (error) {
    next(error);
  }
};

module.exports = addIngredient;
