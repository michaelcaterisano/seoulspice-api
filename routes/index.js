const express = require("express");
const router = express.Router();
var cors = require("cors");

const getLoyaltyAccountController = require("../controllers/getLoyaltyAccountController");
const createOrderController = require("../controllers/createOrderController");
const createLoyaltyRewardController = require("../controllers/createLoyaltyRewardController");
const createPaymentController = require("../controllers/createPaymentController");
const getOrderSummaryController = require("../controllers/getOrderSummaryController");
const getLocationsController = require("../controllers/getLocationsController");
const discountCodeController = require("../controllers/discountCodeController");
const accumulateLoyaltyPointsController = require("../controllers/accumulateLoyaltyPointsController");
const sendReceiptController = require("../controllers/sendReceiptController");

// CORS
const whitelist = [
  "https://pickup.seoulspice.com",
  "https://dev-seoulspice-pickup.netlify.app",
  "https://staging-seoulspice-pickup.netlify.app",
  "https://seoulspice-pickup.netlify.app",
];

let corsOptions;
if (
  process.env.NODE_ENV === "local-dev" ||
  process.env.NODE_ENV === "local-prod"
) {
  corsOptions = {
    origin: "*",
    optionsSucessStatus: 200,
  };
} else {
  corsOptions = {
    origin: (origin, callback) => {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  };
}

// ROUTES
router.options("*", cors());

router.get("/health", (req, res) => {
  const origin = req.get("origin");
  res.send(`${process.env.NODE_ENV} API is running`);
});
router.get("/order-summary", cors(corsOptions), getOrderSummaryController);
router.post("/locations", cors(corsOptions), getLocationsController);

// POST
router.post("/create-order", cors(corsOptions), createOrderController);
router.post(
  "/get-loyalty-account",
  cors(corsOptions),
  getLoyaltyAccountController
);
router.post(
  "/create-loyalty-reward",
  cors(corsOptions),
  createLoyaltyRewardController
);
router.post("/create-payment", cors(corsOptions), createPaymentController);
router.post("/discount-code", cors(corsOptions), discountCodeController);
router.post(
  "/accumulate-loyalty-points",
  cors(corsOptions),
  accumulateLoyaltyPointsController
);
router.post("/text-receipt", cors(corsOptions), sendReceiptController);

module.exports = router;
