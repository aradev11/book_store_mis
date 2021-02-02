"use strict";

var Customer = require("../models/customer.model"); // import validation


var _require = require('../security/validation'),
    customerValidation = _require.customerValidation; //Get all data from database


exports.allCustomer = function _callee(req, res) {
  var dtl, allCustomer;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          dtl = req.query.dtl;
          allCustomer = "";
          _context.prev = 2;

          if (!(dtl == "show")) {
            _context.next = 9;
            break;
          }

          _context.next = 6;
          return regeneratorRuntime.awrap(Customer.find().populate('addresses.city').populate('addresses.country'));

        case 6:
          allCustomer = _context.sent;
          _context.next = 12;
          break;

        case 9:
          _context.next = 11;
          return regeneratorRuntime.awrap(Customer.find());

        case 11:
          allCustomer = _context.sent;

        case 12:
          if (allCustomer) {
            _context.next = 14;
            break;
          }

          return _context.abrupt("return", res.status(404).send("Not Found"));

        case 14:
          res.status(201).send(allCustomer);
          _context.next = 20;
          break;

        case 17:
          _context.prev = 17;
          _context.t0 = _context["catch"](2);
          res.status(400).json(_context.t0);

        case 20:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 17]]);
}; // Get Single data from database 


exports.singleCustomer = function _callee2(req, res) {
  var dtl, id, singleCustomer;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          dtl = req.query.dtl;
          id = req.params.id;
          singleCustomer = "";
          _context2.prev = 3;

          if (!(dtl === "show")) {
            _context2.next = 10;
            break;
          }

          _context2.next = 7;
          return regeneratorRuntime.awrap(Customer.findById(id).populate('addresses.country').populate('addresses.city'));

        case 7:
          singleCustomer = _context2.sent;
          _context2.next = 13;
          break;

        case 10:
          _context2.next = 12;
          return regeneratorRuntime.awrap(Customer.findById(id));

        case 12:
          singleCustomer = _context2.sent;

        case 13:
          if (singleCustomer) {
            _context2.next = 15;
            break;
          }

          return _context2.abrupt("return", res.status(404).send("NOT FOUND"));

        case 15:
          res.status(201).send(singleCustomer);
          _context2.next = 21;
          break;

        case 18:
          _context2.prev = 18;
          _context2.t0 = _context2["catch"](3);
          res.status(400).json(_context2.t0);

        case 21:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[3, 18]]);
}; // Add data to database 


exports.addCustomer = function _callee3(req, res) {
  var _customerValidation, error, _req$body, id_card, first_name, last_name, customerExists, newCustomer, savedCustomer;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          // Check Validation 
          _customerValidation = customerValidation(res.body), error = _customerValidation.error;

          if (!error) {
            _context3.next = 3;
            break;
          }

          return _context3.abrupt("return", res.status(400).send(error.details[0].message));

        case 3:
          // Check if Exists
          _req$body = req.body, id_card = _req$body.id_card, first_name = _req$body.first_name, last_name = _req$body.last_name;
          _context3.next = 6;
          return regeneratorRuntime.awrap(Customer.findOne({
            id_card: id_card,
            first_name: first_name,
            last_name: last_name
          }));

        case 6:
          customerExists = _context3.sent;

          if (!customerExists) {
            _context3.next = 9;
            break;
          }

          return _context3.abrupt("return", res.status(400).send("Customer Already Exists"));

        case 9:
          newCustomer = new Customer(req.body);
          _context3.prev = 10;
          _context3.next = 13;
          return regeneratorRuntime.awrap(newCustomer.save());

        case 13:
          savedCustomer = _context3.sent;

          if (savedCustomer) {
            _context3.next = 16;
            break;
          }

          return _context3.abrupt("return", req.status(400).send("Customer Not Add"));

        case 16:
          res.status(201).send(savedCustomer);
          _context3.next = 22;
          break;

        case 19:
          _context3.prev = 19;
          _context3.t0 = _context3["catch"](10);
          res.status(400).json(_context3.t0);

        case 22:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[10, 19]]);
}; // delete Customer from database


exports.deleteCustomer = function _callee4(req, res) {
  var deletedCustomer;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(Customer.remove({
            _id: req.params.id
          }));

        case 3:
          deletedCustomer = _context4.sent;

          if (deletedCustomer) {
            _context4.next = 6;
            break;
          }

          return _context4.abrupt("return", res.status(400).send("Can't delet this Customer"));

        case 6:
          res.status(200).send("Customer with id of: ".concat(res.params.id, " Delete Successfully"));
          _context4.next = 12;
          break;

        case 9:
          _context4.prev = 9;
          _context4.t0 = _context4["catch"](0);
          res.status(400).json(_context4.t0);

        case 12:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 9]]);
}; // Udate Customer from datadat with id


exports.editCustomer = function _callee5(req, res) {
  var _customerValidation2, error, updateResult;

  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          // Check Validation 
          _customerValidation2 = customerValidation(res.body), error = _customerValidation2.error;

          if (!error) {
            _context5.next = 3;
            break;
          }

          return _context5.abrupt("return", res.status(400).send(error.details[0].message));

        case 3:
          _context5.prev = 3;
          _context5.next = 6;
          return regeneratorRuntime.awrap(Customer.findByIdAndUpdate(req.params.id, req.body));

        case 6:
          updateResult = _context5.sent;

          if (updateResult) {
            _context5.next = 9;
            break;
          }

          return _context5.abrupt("return", res.status(400).send("Not Updated"));

        case 9:
          res.status(200).send("Updated Successfully");
          _context5.next = 15;
          break;

        case 12:
          _context5.prev = 12;
          _context5.t0 = _context5["catch"](3);
          res.status(500).json(_context5.t0);

        case 15:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[3, 12]]);
};