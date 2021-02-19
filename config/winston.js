const { createLogger, format, transports } = require("winston");
const { combine, timestamp, colorize, printf, json, simple } = format;
require("winston-daily-rotate-file");

const myFormat = printf(({ message, data, timestamp }) => {
  return `${timestamp} ${message} ${data}`;
});

const getTimestamp = () => {
  return new Date().toLocaleString("en-US", { timeZone: "America/New_York" });
};

const fileTransport = new transports.DailyRotateFile({
  filename: "./logs/activity-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "14d",
  // level: "info",
  timestamp: true,
  format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), json()),
});

const consoleTransport = new transports.Console({
  level: "error",
  format: simple(),
});

const options = {
  transports: [fileTransport, consoleTransport],
};

const logger = new createLogger(options);

module.exports = logger;
