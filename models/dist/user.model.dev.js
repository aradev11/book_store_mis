"use strict";

var mongoose = require('mongoose');

var ObjectId = mongoose.Schema.Types.ObjectId;
var userSchema = new mongoose.Schema({
  user_name: {
    type: String,
    required: true,
    max: 255
  },
  pwd: {
    type: String,
    required: true,
    max: 1024
  },
  user_type: {
    type: String,
    required: true
  },
  is_active: {
    type: Boolean,
    "default": false
  },
  emp: {
    type: ObjectId,
    ref: "employees"
  },
  date: {
    type: Date,
    "default": Date.now
  }
});
module.exports = mongoose.model('user', userSchema);