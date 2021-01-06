const express = require("express");
const router = express.Router();
var cors = require("cors");

const getLoyaltyAccountController = require("../controllers/getLoyaltyAccountController");
const createOrderController = require("../controllers/createOrderController");
const createLoyaltyRewardController = require("../controllers/createLoyaltyRewardController");
const createPaymentController = require("../controllers/createPaymentController");
const getOrderSummaryController = require("../controllers/getOrderSummaryController");
const getLocationsController = require("../controllers/getLocationsController");

// CORS
const whitelist = [
  "http://localhost:8080",
  "https://pickup.seoulspice.com",
  "https://dev-seoulspice-pickup.netlify.app",
  "https://staging-seoulspice-pickup.netlify.app",
  "https://seoulspice-pickup.netlify.app",
];

let corsOptions;
if (process.env.NODE_ENV === "local") {
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

router.get("/order-summary", cors(corsOptions), getOrderSummaryController);

router.get("/locations", cors(corsOptions), getLocationsController);

module.exports = router;
