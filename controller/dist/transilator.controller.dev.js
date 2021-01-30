"use strict";

var Transilator = require("../models/transilator.model"); //Import Transilator Validation


var _require = require("../security/validation"),
    transilatorValidation = _require.transilatorValidation; // Get all data from database


exports.allTransilator = function _callee(req, res) {
  var allTransilator;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(Transilator.find());

        case 3:
          allTransilator = _context.sent;

          if (allTransilator) {
            _context.next = 6;
            break;
          }

          return _context.abrupt("return", res.status(404).send("Not Found"));

        case 6:
          res.status(201).send(allTransilator);
          _context.next = 12;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          res.send(400).json(_context.t0);

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 9]]);
}; // Get all data by id from database 


exports.singleTransilator = function _callee2(req, res) {
  var singleTransilator;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Transilator.findById(req.params.id));

        case 3:
          singleTransilator = _context2.sent;
          res.status(201).send(singleTransilator);
          _context2.next = 10;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          res.status(400).json(_context2.t0);

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
}; // Post single Data to database


exports.addTransilator = function _callee3(req, res) {
  var _transilatorValidatio, error, transilatorExists, newTransilator, savedTransilator;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          // Check validation
          _transilatorValidatio = transilatorValidation(req.body), error = _transilatorValidatio.error;

          if (!error) {
            _context3.next = 3;
            break;
          }

          return _context3.abrupt("return", res.status(400).send(error.details[0].message));

        case 3:
          _context3.next = 5;
          return regeneratorRuntime.awrap(Transilator.findOne({
            first_name: req.body.first_name,
            last_name: req.body.last_name
          }));

        case 5:
          transilatorExists = _context3.sent;

          if (!transilatorExists) {
            _context3.next = 8;
            break;
          }

          return _context3.abrupt("return", res.status(400).send("Post Already Exists"));

        case 8:
          newTransilator = new Transilator({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            img: req.body.img,
            about: req.body.about,
            email: req.body.email,
            website: req.body.website
          });
          _context3.prev = 9;
          _context3.next = 12;
          return regeneratorRuntime.awrap(newTransilator.save());

        case 12:
          savedTransilator = _context3.sent;
          res.status(201).send(savedTransilator);
          _context3.next = 19;
          break;

        case 16:
          _context3.prev = 16;
          _context3.t0 = _context3["catch"](9);
          res.status(400).json(_context3.t0);

        case 19:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[9, 16]]);
}; // delete Transilator form database


exports.deleteTransilator = function _callee4(req, res) {
  var deletedTransilator;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          deletedTransilator = Transilator.remove({
            _id: req.params.id
          });

          if (deletedTransilator) {
            _context4.next = 4;
            break;
          }

          return _context4.abrupt("return", res.status(401).send("Transilator with id of: ".concat(req.params.id, " Not Delete")));

        case 4:
          res.status(200).send("Transilator with id of: ".concat(req.params.id, " Delte Successfully"));
          _context4.next = 10;
          break;

        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](0);
          res.status(400).json(_context4.t0);

        case 10:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 7]]);
}; // update Transilator from database 


exports.editTransilator = function _callee5(req, res) {
  var _transilatorValidatio2, error, updateResult;

  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          // Check validation
          _transilatorValidatio2 = transilatorValidation(req.body), error = _transilatorValidatio2.error;

          if (!error) {
            _context5.next = 3;
            break;
          }

          return _context5.abrupt("return", res.status(400).send(error.details[0].message));

        case 3:
          _context5.prev = 3;
          _context5.next = 6;
          return regeneratorRuntime.awrap(Transilator.findByIdAndUpdate(req.params.id, req.body));

        case 6:
          updateResult = _context5.sent;

          if (updateResult) {
            _context5.next = 9;
            break;
          }

          return _context5.abrupt("return", res.status(400).send("Not Updated"));

        case 9:
          res.status(200).json(updateResult);
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