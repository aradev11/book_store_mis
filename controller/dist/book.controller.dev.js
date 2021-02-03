"use strict";

var Book = require("../models/book.model"); //IMPORT BOOK VALIDATION BEFORE DATA SEND TO DATABASE 


var _require = require('../security/validation'),
    bookValidation = _require.bookValidation; //GET THE ALL BOOKS


exports.getAllBook = function _callee(req, res) {
  var allBook;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(Book.find());

        case 3:
          allBook = _context.sent;
          res.send(allBook);
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          res.sendStatus(400).json(_context.t0);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
}; // GET THE SINGLE DATA BY ID


exports.getSingleBook = function _callee2(req, res) {
  var singBook;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Book.findById(req.params.id));

        case 3:
          singBook = _context2.sent;

          if (singBook) {
            _context2.next = 6;
            break;
          }

          return _context2.abrupt("return", res.status(400).send("There is No book"));

        case 6:
          // send respone as single post
          res.send(singBook);
          _context2.next = 12;
          break;

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](0);
          res.sendStatus(400).json();

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 9]]);
}; // POST DATA TO DATABASE


exports.addBook = function _callee3(req, res) {
  var _bookValidation, error, bookExists, newBook, savedBook;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          // CHECK IF POST IS INVALID
          _bookValidation = bookValidation(req.body), error = _bookValidation.error;

          if (!error) {
            _context3.next = 3;
            break;
          }

          return _context3.abrupt("return", res.status(400).send(error.details[0].message));

        case 3:
          _context3.next = 5;
          return regeneratorRuntime.awrap(Book.findOne({
            name: res.body.name,
            edition: res.body.edition
          }));

        case 5:
          bookExists = _context3.sent;

          if (!bookExists) {
            _context3.next = 8;
            break;
          }

          return _context3.abrupt("return", res.status(400).send("There is a book with name of ".concat(res.body.name, " and edition of ").concat(res.body.edition)));

        case 8:
          newBook = new Book({
            isbn: req.body.isbn,
            name: req.body.name,
            author: {
              aut_id: req.body.author.aut_id,
              aut_name: req.body.author.aut_name,
              aut_lname: req.body.author.aut_lname
            },
            cat: {
              cat_id: req.body.cat.cat_id,
              cat_name: req.body.cat.cat_name
            },
            lang: {
              lang_id: req.body.lang.lang_id,
              lang_name: req.body.lang.lang_name
            },
            edition: req.body.edition,
            volume: req.body.volume,
            wrapper: req.body.wrapper,
            unit: {
              unit_id: req.body.unit.unit_id,
              unit_type: req.body.unit.unit_type
            },
            price: req.body.price,
            details: {
              view: req.body.details.view,
              content: req.body.details.content,
              transilator: {
                trans_id: req.body.details.transilator.trans_id,
                trans_name: req.body.details.transilator.trans_name,
                trans_lname: req.body.details.transilator.trans_lname
              },
              shelf: req.body.details.shelf,
              publisher: {
                pub_id: req.body.details.publisher.pub_id,
                pub_name: req.body.details.publisher.pub_name
              },
              pdf: req.body.details.pdf,
              img: req.body.details.img
            }
          });
          _context3.prev = 9;
          _context3.next = 12;
          return regeneratorRuntime.awrap(newBook.save());

        case 12:
          savedBook = _context3.sent;
          res.status(201).send(savedBook);
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
}; // EDIT EACH BOOK BY ID OF ANY POST


exports.updateBook = function _callee4(req, res) {
  var updateResult;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(Book.findByIdAndUpdate(req.params.id, req.body));

        case 3:
          updateResult = _context4.sent;
          res.status(200).json(updateResult);
          res.send(updateResult);
          _context4.next = 11;
          break;

        case 8:
          _context4.prev = 8;
          _context4.t0 = _context4["catch"](0);
          res.sendStatus(400).json(_context4.t0);

        case 11:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 8]]);
}; // DELETE BOOK WITH ID BY ID


exports.deleteBook = function _callee5(req, res) {
  var deleteBook;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(Book.findByIdAndDelete(req.params.id, req.body));

        case 3:
          deleteBook = _context5.sent;

          if (deleteBook) {
            _context5.next = 6;
            break;
          }

          return _context5.abrupt("return", res.status(401).send("DELETE PROCESS WITH ID OF ".concat(res.params.id, " IS FAILD")));

        case 6:
          res.status(200).send("POST WITH ID OF ".concat(req.params.id, " IS DELETE SUCCESSFULLY"));
          _context5.next = 12;
          break;

        case 9:
          _context5.prev = 9;
          _context5.t0 = _context5["catch"](0);
          res.status(400).json(_context5.t0);

        case 12:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 9]]);
};