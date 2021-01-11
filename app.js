const express = require("express");
const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");
const fs = require("fs");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const logger = require("./config/winston");
const router = require("./routes/index");
const { Console } = require("console");
const app = express();
const port = process.env.PORT || 3000;

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

if (
  process.env.NODE_ENV === "development" ||
  process.env.NODE_ENV === "local"
) {
  app.use(morgan("dev"));
}
app.use(morgan("combined"));
app.use(
  morgan("common", {
    stream: fs.createWriteStream("./logs/access.log", { flags: "a" }),
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "production") {
  app.use(Sentry.Handlers.requestHandler());
  app.use(Sentry.Handlers.tracingHandler());
}

app.use("/", router);

// app.get("*", (req, res) => {
//   res.status(404).send();
// });
if (process.env.NODE_ENV === "production") {
  app.use(Sentry.Handlers.errorHandler());
}

// error handling
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

app.listen(port, () => console.log(`listening on ${port}`));
