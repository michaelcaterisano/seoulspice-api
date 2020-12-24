const { Client, Environment } = require("square");

const client = new Client({
  environment: Environment.Sandbox,
  accessToken:
    process.env.NODE_ENV === "development"
      ? process.env.SQUARE_SANDBOX_ACCESS_TOKEN
      : process.env.SQUARE_ACCESS_TOKEN,
});

module.exports = client;
