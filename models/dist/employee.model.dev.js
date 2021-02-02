"use strict";

var mongoose = require("mongoose"); // CREATING EMPLOYEE SCHEMA


var ObjectId = mongoose.Schema.Types.ObjectId;
var employeeSchema = new mongoose.Schema({
  id_card: {
    type: String,
    required: true
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
  father_name: {
    type: String,
    max: 100
  },
  is_active: {
    type: Boolean,
    "default": false
  },
  brand: {
    type: ObjectId,
    ref: "brand"
  },
  contract: [{
    type: ObjectId,
    ref: "contracts"
  }],
  email: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  auth: {
    type: ObjectId,
    ref: 'users'
  },
  code: {
    type: Number,
    required: true
  },
  data: {
    type: Date,
    "default": Date.now
  },
  addresses: [{
    street: {
      type: String,
      required: true,
      min: 6
    },
    street2: {
      type: String,
      min: 6
    },
    country: {
      type: ObjectId,
      ref: "countries"
    },
    city: {
      type: ObjectId,
      ref: "citry"
    }
  }]
});
module.exports = mongoose.model("employees", employeeSchema);