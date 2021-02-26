const mongoose = require("mongoose");

const LocationSchema = new mongoose.Schema({
  name: { type: String, unique: true },
});

const Location = mongoose.model("Location", LocationSchema);

module.exports = Location;
