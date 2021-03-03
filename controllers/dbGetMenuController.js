const dbService = require("../services/dbService");
const menu = require("../data/menu");
const { filterMenu } = require("../utils/utils");

const dbGetMenuController = async (req, res, next) => {
  try {
    let menuData = Object.assign({}, menu);
    const { locationId } = req.query;
    const outOfStock = await dbService.getOutOfStockAtLocation(locationId);
    const filteredMenu = filterMenu(menuData, outOfStock);
    res.json({ success: true, outOfStock, menuData: filteredMenu });
  } catch (error) {
    next(error);
  }
};

module.exports = dbGetMenuController;
