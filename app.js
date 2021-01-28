const express = require("express");
const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");
const fs = require("fs");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const logger = require("./config/winston");
const router = require("./routes/index");
const { getTimestamp } = require("./utils/utils");
const { Console } = require("console");
const app = express();
const port = process.env.PORT || 3000;

// sentry config
Sentry.init({
  dsn:
    "https://292e0f7beb6646b7ab460f01ab15cd1d@o503252.ingest.sentry.io/5588106",
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Tracing.Integrations.Express({ app }),
  ],
  // percentage of transactions sent to sentry, between 0 and 1
  tracesSampleRate: 1.0,
});

// morgan config
morgan.token("localDate", getTimestamp);

morgan.format(
  "combined",
  ':remote-addr - :remote-user [:localDate]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"'
);

app.use(morgan("combined"));

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// sentry handlers
if (process.env.NODE_ENV === "production") {
  app.use(Sentry.Handlers.requestHandler());
  app.use(Sentry.Handlers.tracingHandler());
}

// router
app.use("/", router);

// sentry error handler
if (process.env.NODE_ENV === "production") {
  app.use(Sentry.Handlers.errorHandler());
}

// catch-all error handler
app.use((error, req, res, next) => {
  console.error(error.stack);
  console.error(error.message);
  if (!res.status) {
    res.status(500).json({ success: false, error });
  } else {
    logger.log({ level: "error", message: "", data: error });
    return res.json({
      success: false,
      error: error.message,
    });
  }
});

// run
app.listen(port, () => console.log(`listening on ${port}`));
