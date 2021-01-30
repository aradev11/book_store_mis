"use strict";

var mongoose = require("mongoose");

var customerSchema = new mongoose.Schema({
  id_card: {
    type: Number
  },
  first_name: {
    type: String,
    required: true,
    max: 100
  },
  last_name: {
    type: String,
    required: true,
    max: 100
  },
  is_active: {
    type: Boolean,
    "default": false
  },
  details: {
    street: {
      type: String,
      required: true,
      max: 100
    },
    street2: {
      type: String,
      max: 100
    },
    country: {
      _id: {
        type: String,
        required: true
      },
      cnt_name: {
        type: String,
        required: true
      },
      cnt_code: {
        type: Number,
        required: true
      }
    },
    city: {
      _id: {
        type: String,
        required: true
      },
      city_name: {
        type: String,
        required: true
      }
    },
    email: {
      type: String,
      required: true,
      min: 6,
      max: 100
    },
    phone: {
      type: String,
      required: true,
      max: 10,
      min: 9
    },
    date: {
      type: Date,
      "default": Date.now
    }
  }
});
module.exports = mongoose.model("cutomer", customerSchema);