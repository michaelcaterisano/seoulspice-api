const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const logger = require("./config/winston");
const router = require("./routes/index");
const { getTimestamp } = require("./utils/utils");
const app = express();
const port = process.env.PORT || 3000;
const rateLimit = require("express-rate-limit");

// trust nginx
app.set("trust proxy", 1);

// morgan config
morgan.token("localDate", getTimestamp);
morgan.format(
  "combined",
  "[:localDate] :method :url :status :res[content-length] :user-agent :remote-addr"
);
app.use(morgan("combined"));

// rate limit config
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: process.env.RATE_LIMIT,
});
app.use(limiter);

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.use("/", router);

// error handler
app.use((error, req, res, next) => {
  if (!res.status) {
    res.status(500).json({ success: false, error });
  } else {
    logger.log({
      level: "error",
      message: error.message,
      stack: error.stack,
      method: req.method,
      url: req.originalUrl,
      ip: req.ip,
      data: error,
    });
    return res.json({
      success: false,
      error: error,
    });
  }
});

app.listen(port, () => console.log(`listening on ${port}`));
