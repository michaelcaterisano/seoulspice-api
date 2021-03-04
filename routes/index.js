const express = require("express");
const router = express.Router();
var cors = require("cors");
const jwt = require("express-jwt");
const jwks = require("jwks-rsa");

const getLoyaltyAccountController = require("../controllers/getLoyaltyAccountController");
const createOrderController = require("../controllers/createOrderController");
const createLoyaltyRewardController = require("../controllers/createLoyaltyRewardController");
const deleteLoyaltyRewardController = require("../controllers/deleteLoyaltyRewardController");
const createPaymentController = require("../controllers/createPaymentController");
const getOrderSummaryController = require("../controllers/getOrderSummaryController");
const getLocationsController = require("../controllers/getLocationsController");
const discountCodeController = require("../controllers/discountCodeController");
const accumulateLoyaltyPointsController = require("../controllers/accumulateLoyaltyPointsController");
const sendReceiptController = require("../controllers/sendReceiptController");

//db controllers
const dbGetMenuController = require("../controllers/dbGetMenuController");
const dbGetIngredientsController = require("../controllers/dbGetIngredientsController");
const dbGetLocationsController = require("../controllers/dbGetLocationsController");
const dbSetIngredientsOutOfStockController = require("../controllers/dbSetIngredientOutOfStockController");
// JWT
const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: process.env.AUTH0_JWKS_URI,
  }),
  audience: process.env.AUTH0_AUDIENCE,
  issuer: process.env.AUTH0_ISSUER,
  algorithms: ["RS256"],
});

// CORS config
let corsOptions;
const allowedUrls = [
  "https://pickup.seoulspice.com",
  "http://pickup.seoulspice.com",
  "https://dev-seoulspice-pickup.netlify.app",
  "https://staging-seoulspice-pickup.netlify.app",
  "https://seoulspice-pickup.netlify.app",
];
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
      if (allowedUrls.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  };
}

// OPTIONS
router.options("*", cors());

// HEALTH
router.get("/health", (req, res) => {
  const origin = req.get("origin");
  res.send(`${process.env.NODE_ENV} API is running`);
});

//MENU
router.get("/menu-test", cors(corsOptions), jwtCheck, (req, res) =>
  res.send({ success: true, message: "ok" })
);

router.get("/menu", cors(corsOptions), dbGetMenuController);

router.get(
  "/ingredients",
  cors(corsOptions),
  jwtCheck,
  dbGetIngredientsController
);

router.post(
  "/ingredients-out-of-stock",
  cors(corsOptions),
  jwtCheck,
  dbSetIngredientsOutOfStockController
);

router.get("/locations", cors(corsOptions), jwtCheck, dbGetLocationsController);

// LOCATIONS
router.post("/locations", cors(corsOptions), getLocationsController);

// ORDER
router.post("/create-order", cors(corsOptions), createOrderController);
router.get("/order-summary", cors(corsOptions), getOrderSummaryController);

// LOYALTY
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
router.post(
  "/accumulate-loyalty-points",
  cors(corsOptions),
  accumulateLoyaltyPointsController
);
router.post(
  "/delete-loyalty-reward",
  cors(corsOptions),
  deleteLoyaltyRewardController
);

// PAYMENT
router.post("/create-payment", cors(corsOptions), createPaymentController);
router.post("/discount-code", cors(corsOptions), discountCodeController);

// TWILIO
router.post("/text-receipt", cors(corsOptions), sendReceiptController);

module.exports = router;
