const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const logger = require("morgan");
const router = require("./routes/index");
const { Console } = require("console");
const app = express();

const port = process.env.PORT || 3000;

// if (!module.parent) { <--- for testing
// }

app.use(
  logger("common", {
    stream: fs.createWriteStream("./access.log", { flags: "a" }),
  })
);

// logging
if (
  process.env.NODE_ENV === "development" ||
  process.env.NODE_ENV === "local"
) {
  // morgan logging stuffz
  app.use(logger("dev"));
}

app.use(logger("combined"));

// TODO:
// set cookie stuff
// set uuid
// if cookie, rate limit

// body parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", router);

// send 404, bottom of file
app.get("*", (req, res) => {
  res.status(404).send();
});

// error catching
app.use((error, req, res, next) => {
  console.error(error.stack);
  console.error(error.message);
  if (!res.status) {
    res.status(500).json({ success: false, error });
  } else {
    return res.json({
      success: false,
      error: error.message,
    });
  }
});

app.listen(port, () => console.log(`listening on ${port}`));
