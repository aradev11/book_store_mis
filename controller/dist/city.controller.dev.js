"use strict";

var City = require("../models/city.model"); // Import City Validation 


var _require = require("../security/validation"),
    cityValidation = _require.cityValidation; // Get all data from database


exports.allCity = function _callee(req, res) {
  var dtl, allCity;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          dtl = req.query.dtl;
          allCity = "";
          _context.prev = 2;

          if (!(dtl == "show")) {
            _context.next = 9;
            break;
          }

          _context.next = 6;
          return regeneratorRuntime.awrap(City.find().populate('country'));

        case 6:
          allCity = _context.sent;
          _context.next = 12;
          break;

        case 9:
          _context.next = 11;
          return regeneratorRuntime.awrap(City.find());

        case 11:
          allCity = _context.sent;

        case 12:
          res.status(201).send(allCity);
          _context.next = 18;
          break;

        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](2);
          res.status(400).json(_context.t0);

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 15]]);
}; // Get single data from database


exports.singleCity = function _callee2(req, res) {
  var dtl, id, singleCity;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          dtl = req.query.dtl;
          id = req.params.id;
          singleCity = "";
          _context2.prev = 3;

          if (!(dtl === "show")) {
            _context2.next = 10;
            break;
          }

          _context2.next = 7;
          return regeneratorRuntime.awrap(City.findById(id).populate('country'));

        case 7:
          singleCity = _context2.sent;
          _context2.next = 13;
          break;

        case 10:
          _context2.next = 12;
          return regeneratorRuntime.awrap(City.findById(id));

        case 12:
          singleCity = _context2.sent;

        case 13:
          if (singleCity) {
            _context2.next = 15;
            break;
          }

          return _context2.abrupt("return", res.status(400).send("Not City with id of: ".concat(id)));

        case 15:
          res.status(201).send(singleCity);
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
}; // Post data to database


exports.addCity = function _callee3(req, res) {
  var _cityValidation, error, name, CityExists, newCity, savedCity;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          //check if validate 
          _cityValidation = cityValidation(req.body), error = _cityValidation.error;

          if (!error) {
            _context3.next = 3;
            break;
          }

          return _context3.abrupt("return", res.status(400).send(error.details[0].message));

        case 3:
          // Check if dublicate
          name = req.body.name;
          _context3.next = 6;
          return regeneratorRuntime.awrap(City.findOne({
            name: name
          }));

        case 6:
          CityExists = _context3.sent;

          if (!CityExists) {
            _context3.next = 9;
            break;
          }

          return _context3.abrupt("return", res.status(400).send("".concat(req.body.name, " is Already Exists")));

        case 9:
          // Creating Schema for new value
          newCity = new City(req.body);
          _context3.prev = 10;
          _context3.next = 13;
          return regeneratorRuntime.awrap(newCity.save());

        case 13:
          savedCity = _context3.sent;
          res.status(201).send(savedCity);
          _context3.next = 20;
          break;

        case 17:
          _context3.prev = 17;
          _context3.t0 = _context3["catch"](10);
          res.status(400).json(err);

        case 20:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[10, 17]]);
}; // Delete data from database 


exports.deleteCity = function _callee4(req, res) {
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          try {} catch (err) {
            res.status(400).json(err);
          }

        case 1:
        case "end":
          return _context4.stop();
      }
    }
  });
}; // Update data from database 


exports.editCity = function _callee5(req, res) {
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          try {} catch (err) {
            res.status(400).json(err);
          }

        case 1:
        case "end":
          return _context5.stop();
      }
    }
  });
};