const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const logger = require("./config/winston");
const router = require("./routes/index");
const { Console } = require("console");
const app = express();
const port = process.env.PORT || 3000;

// if (!module.parent) { <--- for testing
// }
// TODO:
// set cookie stuff
// set uuid
// if cookie, rate limit

// body parsing

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
app.use("/", router);
app.get("*", (req, res) => {
  res.status(404).send();
});

// error handling
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
