const express = require("express");
const router = express.Router();
var cors = require("cors");
const jwt = require("express-jwt");
const jwks = require("jwks-rsa");
const dbService = require("../services/dbService");

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
const addIngredientController = require("../controllers/addIngredientController");
const getLocationIngredientsController = require("../controllers/getLocationIngredientsController");

<<<<<<< HEAD
// CORS config
let corsOptions;
const allowedUrls = [
=======
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

// CORS
const whitelist = [
>>>>>>> 9a8073c... add menu route and jwt check
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
router.post("/add-ingredient", cors(corsOptions), addIngredientController);
router.get(
  "/location-ingredients",
  cors(corsOptions),
  getLocationIngredientsController
);
router.post("/add-location", cors(corsOptions), async (req, res, next) => {
  try {
    const location = await dbService.addLocation(req.body);
    res.send(location);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/ingredient-out-of-stock",
  cors(corsOptions),
  async (req, res, next) => {
    const { name, locationId } = req.body;
    try {
      const ingredient = await dbService.setIngredientOutOfStock(
        name,
        locationId
      );
      res.send(ingredient);
    } catch (error) {
      next(error);
    }
  }
);

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
