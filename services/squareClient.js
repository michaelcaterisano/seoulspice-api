const { Client, Environment } = require("square");

const client = new Client({
  environment:
    process.env.NODE_ENV === "development" ||
    process.env.NODE_ENV === "local-dev"
      ? Environment.Sandbox
      : Environment.Production,
  accessToken:
    process.env.NODE_ENV === "development" ||
    process.env.NODE_ENV === "local-dev"
      ? process.env.SQUARE_SANDBOX_ACCESS_TOKEN
      : process.env.SQUARE_ACCESS_TOKEN,
});

module.exports = client;
