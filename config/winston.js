const { createLogger, format, transports } = require("winston");
const { combine, timestamp, colorize, printf, json, simple } = format;
const DatadogWinston = require("datadog-winston");
require("winston-daily-rotate-file");

const fileTransport = new transports.DailyRotateFile({
  filename: "./logs/activity-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "14d",
  format: combine(timestamp(), json()),
});

const consoleTransport = new transports.Console({
  level: "error",
  format: simple(),
});

const options = {
  transports: [fileTransport, consoleTransport],
};

const logger = new createLogger(options);

logger.add(
  new DatadogWinston({
    apiKey: process.env.DATADOG_API_KEY,
    hostname: process.env.DATADOG_APP_ID,
    service: "express",
    ddsource: "nodejs",
    ddtags: "api",
  })
);

module.exports = logger;
