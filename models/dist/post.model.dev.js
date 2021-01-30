"use strict";

var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    max: 100,
    min: 6
  },
  text: {
    type: String,
    required: true,
    max: 255,
    min: 10
  },
  postBy: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    "default": Date.now
  }
});
module.exports = mongoose.model('posts', postSchema);