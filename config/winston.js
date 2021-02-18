const { createLogger, format, transports } = require("winston");
const { combine, timestamp, label, printf, json, simple } = format;
require("winston-daily-rotate-file");

const myFormat = printf(({ message, data, timestamp }) => {
  return `${timestamp} ${message} ${data}`;
});

const getTimestamp = () => {
  return new Date().toLocaleString("en-US", { timeZone: "America/New_York" });
};

const transport = new transports.DailyRotateFile({
  filename: "./logs/activity-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "14d",
});

const options = {
  level: "info",
  format: combine(timestamp({ format: getTimestamp() }), json(), myFormat),
  transports: [transport],
};

const logger = new createLogger(options);

module.exports = logger;
