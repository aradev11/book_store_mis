"use strict";

var Author = require("../models/author.model"); // Import Author Validation


var _require = require("../security/validation"),
    authorValidation = _require.authorValidation; // Get all data from database


exports.allAuthor = function _callee(req, res) {
  var allAuthor;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(Author.find());

        case 3:
          allAuthor = _context.sent;
          res.status(201).send(allAuthor);
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          res.status(400).json(_context.t0);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
}; // Get single Value from database


exports.singleAuthor = function _callee2(req, res) {
  var author;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Author.findById(req.params.id));

        case 3:
          author = _context2.sent;
          res.status(201).send(author);
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
}; // Post data to database


exports.postAuthor = function _callee3(req, res) {
  var _authorValidation, error, authorExists, newAuthor, savedAuthor;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          // Check if post invalid
          _authorValidation = authorValidation(req.body), error = _authorValidation.error;

          if (!error) {
            _context3.next = 3;
            break;
          }

          return _context3.abrupt("return", res.status(400).send(error.details[0].message));

        case 3:
          _context3.next = 5;
          return regeneratorRuntime.awrap(Author.findOne({
            first_name: req.body.first_name,
            last_name: req.body.last_name
          }));

        case 5:
          authorExists = _context3.sent;

          if (!authorExists) {
            _context3.next = 8;
            break;
          }

          return _context3.abrupt("return", res.status(400).send("Author Is Already Exists"));

        case 8:
          newAuthor = new Author({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            img: req.body.img,
            about: req.body.about,
            email: req.body.email,
            website: req.body.website
          });
          _context3.prev = 9;
          _context3.next = 12;
          return regeneratorRuntime.awrap(newAuthor.save());

        case 12:
          savedAuthor = _context3.sent;
          res.status(201).send(savedAuthor);
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
}; // delete Author from database


exports.deleteAuthor = function _callee4(req, res) {
  var deleteAuthor;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(Author.remove({
            _id: req.params.id
          }));

        case 3:
          deleteAuthor = _context4.sent;

          if (deleteAuthor) {
            _context4.next = 6;
            break;
          }

          return _context4.abrupt("return", res.status(401).send("Can't Delete Author with id of: ".concat(req.params.id)));

        case 6:
          res.status(200).send("Author with id of ".concat(req.params.id, " Delete Successfully"));
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
}; // Update Author From databse


exports.updateAuthor = function _callee5(req, res) {
  var _authorValidation2, error, updateResult;

  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          // Check if post invalid
          _authorValidation2 = authorValidation(req.body), error = _authorValidation2.error;

          if (!error) {
            _context5.next = 3;
            break;
          }

          return _context5.abrupt("return", res.status(400).send(error.details[0].message));

        case 3:
          _context5.prev = 3;
          _context5.next = 6;
          return regeneratorRuntime.awrap(Author.findByIdAndUpdate(req.params.id, req.body));

        case 6:
          updateResult = _context5.sent;
          res.status(200).json(updateResult);
          _context5.next = 13;
          break;

        case 10:
          _context5.prev = 10;
          _context5.t0 = _context5["catch"](3);
          res.status(500).json(_context5.t0);

        case 13:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[3, 10]]);
};