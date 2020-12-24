const express = require("express");
const router = express.Router();

const { Client, Environment } = require("square");

const client = new Client({
  environment: Environment.Sandbox,
  accessToken:
    process.env.NODE_ENV === "development"
      ? process.env.SQUARE_SANDBOX_ACCESS_TOKEN
      : process.env.SQUARE_ACCESS_TOKEN,
});

router.post("/", async (req, res) => {
  try {
    const response = await client.loyaltyApi.searchLoyaltyAccounts({
      query: {
        mappings: [
          {
            type: "PHONE",
            value: req.body.phoneNumber,
          },
        ],
      },
    });
    return res.send(response.result.loyaltyAccounts);
  } catch (error) {
    return res.status(400).json({ error: error.toString() });
  }
});

module.exports = router;
