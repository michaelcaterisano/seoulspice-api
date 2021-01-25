const loyaltyService = require("../services/loyaltyService");

const accumulateLoyaltyPointsController = async (req, res, next) => {
  try {
    const { orderId, phoneNumber, locationId } = req.body;

    let points = 0;
    const { result } = await loyaltyService.accumulateLoyaltyPoints({
      phoneNumber,
      orderId,
      locationId,
    });

    // doing this because api returns {} if points are not accrued
    if (result.event) {
      points = result.event.accumulatePoints.points;
    }

    return res.json({
      success: true,
      accumulatedLoyaltyPoints: points,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = accumulateLoyaltyPointsController;
