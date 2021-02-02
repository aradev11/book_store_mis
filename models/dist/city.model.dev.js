"use strict";

var mongoose = require("mongoose");

var citySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  country: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "countries"
  },
  date: {
    type: Date,
    "default": Date.now
  }
});
module.exports = mongoose.model("cities", citySchema);