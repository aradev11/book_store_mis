"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var countrySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  lang: [{
    type: String,
    required: true
  }],
  code: {
    type: Number,
    required: true
  },
  cities: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "cities"
  }],
  date: {
    type: Date,
    "default": Date.now
  }
});
module.exports = mongoose.model("countries", countrySchema);