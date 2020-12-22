const { Router } = require("express");
const express = require("express");
const router = express.Router();

module.exports = router;

router.get("/", (req, res) => {
  res.send("loyalty stuffzzz");
});
