"use strict";

var mongoos = require("mongoose");

var authorSchema = new mongoos.Schema({
  first_name: {
    type: String,
    required: true,
    min: 1,
    max: 100
  },
  last_name: {
    type: String,
    required: true,
    min: 1,
    max: 100
  },
  img: {
    type: String,
    required: true
  },
  about: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  website: {
    type: String
  },
  date: {
    type: Date,
    "default": Date.now
  }
});
module.exports = mongoos.model("author", authorSchema);