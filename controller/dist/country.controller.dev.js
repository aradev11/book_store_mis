"use strict";

var Country = require("../models/country.model");

var City = require("../models/city.model"); // Import City Validation 


var _require = require("../security/validation"),
    countryValidation = _require.countryValidation,
    cityValidation = _require.cityValidation; // Get all data from database


exports.allCountry = function _callee(req, res) {
  var dtl;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          dtl = req.query.dtl;
          _context.prev = 1;

          if (!(dtl == "show")) {
            _context.next = 8;
            break;
          }

          _context.next = 5;
          return regeneratorRuntime.awrap(Country.find().populate('cities'));

        case 5:
          allCountry = _context.sent;
          _context.next = 11;
          break;

        case 8:
          _context.next = 10;
          return regeneratorRuntime.awrap(Country.find());

        case 10:
          allCountry = _context.sent;

        case 11:
          res.status(201).send(allCountry);
          _context.next = 17;
          break;

        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](1);
          res.status(400).json(_context.t0);

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 14]]);
}; // Get single data from database


exports.singleCountry = function _callee2(req, res) {
  var dtl, id, singleCountry;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          dtl = req.query.dtl;
          id = req.params.id;
          singleCountry = "";
          _context2.prev = 3;

          if (!(dtl === "show")) {
            _context2.next = 10;
            break;
          }

          _context2.next = 7;
          return regeneratorRuntime.awrap(Country.findById(id).populate('cities'));

        case 7:
          singleCountry = _context2.sent;
          _context2.next = 13;
          break;

        case 10:
          _context2.next = 12;
          return regeneratorRuntime.awrap(Country.findById(id));

        case 12:
          singleCountry = _context2.sent;

        case 13:
          if (singleCountry) {
            _context2.next = 15;
            break;
          }

          return _context2.abrupt("return", res.status(400).send("No Country"));

        case 15:
          console.log(req.query);
          res.status(200).send(singleCountry);
          _context2.next = 22;
          break;

        case 19:
          _context2.prev = 19;
          _context2.t0 = _context2["catch"](3);
          res.status(400).json(_context2.t0);

        case 22:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[3, 19]]);
}; // Post data to database


exports.addCountry = function _callee3(req, res) {
  var _countryValidation, error, countryExists, newCountry, savedCountry;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          //check if validate 
          _countryValidation = countryValidation(req.body), error = _countryValidation.error;

          if (!error) {
            _context3.next = 3;
            break;
          }

          return _context3.abrupt("return", res.status(400).send(error.details[0].message));

        case 3:
          _context3.next = 5;
          return regeneratorRuntime.awrap(Country.findOne({
            name: req.body.name
          }));

        case 5:
          countryExists = _context3.sent;

          if (!countryExists) {
            _context3.next = 8;
            break;
          }

          return _context3.abrupt("return", res.status(400).send("Country Duplicated"));

        case 8:
          // Creating Schema for new value
          newCountry = new Country(req.body);
          _context3.prev = 9;
          _context3.next = 12;
          return regeneratorRuntime.awrap(newCountry.save());

        case 12:
          savedCountry = _context3.sent;
          res.status(201).send(savedCountry);
          _context3.next = 19;
          break;

        case 16:
          _context3.prev = 16;
          _context3.t0 = _context3["catch"](9);
          res.status(400).json(err);

        case 19:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[9, 16]]);
}; // Delete data from database 


exports.deleteCountry = function _callee4(req, res) {
  var id, deleteCountry, deleteRelativeCity;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          id = req.params.id;
          _context4.next = 4;
          return regeneratorRuntime.awrap(Country.remove({
            _id: id
          }));

        case 4:
          deleteCountry = _context4.sent;
          _context4.next = 7;
          return regeneratorRuntime.awrap(City.remove({
            country: id
          }));

        case 7:
          deleteRelativeCity = _context4.sent;

          if (!(!deleteRelativeCity || !deleteCountry)) {
            _context4.next = 10;
            break;
          }

          return _context4.abrupt("return", res.status(401).send("Country With id of: ".concat(id, " Not Delete")));

        case 10:
          res.status(200).send("Country with id of: ".concat(id, " delete Successfully"));
          _context4.next = 16;
          break;

        case 13:
          _context4.prev = 13;
          _context4.t0 = _context4["catch"](0);
          res.status(400).json(_context4.t0);

        case 16:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 13]]);
}; // Update data from database 


exports.editCountry = function _callee5(req, res) {
  var _countryValidation2, error, id, updateResult;

  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          // Check if Country Value is Correct
          _countryValidation2 = countryValidation(req.body), error = _countryValidation2.error;

          if (!error) {
            _context5.next = 3;
            break;
          }

          return _context5.abrupt("return", res.status(400).send(error.details[0].message));

        case 3:
          _context5.prev = 3;
          id = req.params.id;
          _context5.next = 7;
          return regeneratorRuntime.awrap(Country.findByIdAndUpdate(id, req.body));

        case 7:
          updateResult = _context5.sent;

          if (updateResult) {
            _context5.next = 10;
            break;
          }

          return _context5.abrupt("return", res.status(400).send("Country Not Update"));

        case 10:
          res.status(201).send("Successfully Updated");
          _context5.next = 16;
          break;

        case 13:
          _context5.prev = 13;
          _context5.t0 = _context5["catch"](3);
          res.status(400).json(_context5.t0);

        case 16:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[3, 13]]);
}; // Post new city with country id and push city id to Country "cities" array


exports.addNewCityByCountry = function _callee6(req, res) {
  var _cityValidation, error, id, name, CityExists, country, newCity;

  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          //check if validate 
          _cityValidation = cityValidation(req.body), error = _cityValidation.error;

          if (!error) {
            _context6.next = 3;
            break;
          }

          return _context6.abrupt("return", res.status(400).send(error.details[0].message));

        case 3:
          // Check if dublicate
          id = req.params.id;
          name = req.body.name;
          _context6.next = 7;
          return regeneratorRuntime.awrap(City.findOne({
            name: name,
            country: id
          }));

        case 7:
          CityExists = _context6.sent;

          if (!CityExists) {
            _context6.next = 10;
            break;
          }

          return _context6.abrupt("return", res.status(400).send("".concat(name, " is Already Exists")));

        case 10:
          _context6.next = 12;
          return regeneratorRuntime.awrap(Country.findById(id));

        case 12:
          country = _context6.sent;
          // Create New City
          newCity = new City(req.body);
          _context6.prev = 14;
          // Assign City id as Country.city
          newCity.country = country; // Save new City

          _context6.next = 18;
          return regeneratorRuntime.awrap(newCity.save());

        case 18:
          // Add city to country array name of "cities"
          country.cities.push(newCity); // Save the Country city

          _context6.next = 21;
          return regeneratorRuntime.awrap(country.save());

        case 21:
          res.status(201).send("Successfully Added");
          _context6.next = 27;
          break;

        case 24:
          _context6.prev = 24;
          _context6.t0 = _context6["catch"](14);
          res.status(400).json(_context6.t0);

        case 27:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[14, 24]]);
};