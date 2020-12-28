const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const logger = require("morgan");
var cors = require("cors");

const router = require("./routes/index");
const app = express();

const port = process.env.PORT || 3000;

// if (!module.parent) { <--- for testing
// }
app.use(
  logger("common", {
    stream: fs.createWriteStream("./access.log", { flags: "a" }),
  })
);

if (process.env.NODE_ENV === "development") {
  // morgan logging stuffz
  app.use(logger("dev"));
}

app.use(cors());

// set cookie stuff
// set uuid
// if cookie, rate limit

// body parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", router);

// send 404, bottom of file
app.get("*", (req, res) => {
  res.status(404).send("i no findy");
});

// error catching
app.use((err, req, res, next) => {
  console.error(err.stack);
  console.log(err.message);
  if (!res.status) {
    res.status(500).send("server error");
  } else {
    return res.send(err);
  }
});

app.listen(port, () => console.log(`listening on ${port}`));
