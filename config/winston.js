const { createLogger, format, transports } = require("winston");
const { combine, timestamp, label, printf, json, simple } = format;

const myFormat = printf(({ message, data, timestamp }) => {
  return `${timestamp} ${message} ${data}`;
});

const getTimestamp = () => {
  var tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
  var localISOTime = new Date(Date.now() - tzoffset).toISOString().slice(0, -1);
  // return new Date().toLocaleString();
  return localISOTime;
};

const options = {
  level: "info",
  format: combine(timestamp({ format: getTimestamp() }), json(), myFormat),
  transports: [
    new transports.File({
      filename: "./logs/error.log",
      level: "error",
    }),
    new transports.File({ filename: "./logs/combined.log" }),
  ],
};

const logger = new createLogger(options);

// if (process.env.NODE_ENV !== "production") {
//   logger.add(
//     new transports.Console({
//       format: simple(),
//     })
//   );
// }

module.exports = logger;
