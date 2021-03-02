const dbService = require("../services/dbService");
const menu = require("../data/menu");
const { filterMenu } = require("../utils/utils");

const dbGetMenuController = async (req, res, next) => {
  try {
    const { locationId } = req.query;
    const outOfStock = await dbService.getOutOfStockAtLocation(locationId);
    const filteredMenu = filterMenu(menu, outOfStock);
    res.json({ outOfStock, menuData: filteredMenu });
  } catch (error) {
    next(error);
  }
};

module.exports = dbGetMenuController;
